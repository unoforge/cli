<?php

namespace FlexiLaravel\Console\Commands;

use FlexiCore\Core\Constants;
use FlexiCore\Core\RegistryComponentReference;
use FlexiCore\Core\RegistryStore;
use FlexiCore\Core\RegistryVersionResolver;
use FlexiCore\Installer\PackageInstaller;
use FlexiCore\Service\ProjectDetector;
use Illuminate\Console\Command;
use Symfony\Component\Yaml\Yaml;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\spin;

class FlexiAddCommand extends Command
{
    protected $signature = 'flexi:add
        {components* : Component refs to add (button, button@0.0.2, @fly-ui/button@0.0.1)}
        {--namespace= : Namespace to use for all components}
        {--skip-deps : Skip dependency installation}
        {--rewrite : Rewrite existing files for already installed components}
        {--no-rewrite : Do not rewrite existing files for already installed components}
        {--dry : Show planned changes only; do not write files or install dependencies}';

    protected $description = 'Add UI components to your project from component registries';

    private string $defaultSource;
    private array $registries;
    private string $projectRoot;
    private array $installedRegistryComponents = [];
    private array $pendingCommands = [];
    private array $createdFiles = [];
    private array $overwrittenFiles = [];
    private array $skippedFiles = [];
    private array $resolvedRegistries = [];
    private array $postInstallMessages = [];
    private bool $skipPackageInstallation = false;
    private bool $dryRun = false;
    private bool $forceRewrite = false;
    private bool $forceNoRewrite = false;

    public function __construct(
        private readonly RegistryStore $store = new RegistryStore(),
        private readonly RegistryVersionResolver $versionResolver = new RegistryVersionResolver()
    ) {
        parent::__construct();
        $this->projectRoot = getcwd();
        $this->loadConfiguration();
    }

    public function handle(): int
    {
        $components = (array) $this->argument('components');
        $namespace = $this->option('namespace');
        $skipDeps = (bool) $this->option('skip-deps');
        $this->dryRun = (bool) $this->option('dry');
        $this->forceRewrite = (bool) $this->option('rewrite');
        $this->forceNoRewrite = (bool) $this->option('no-rewrite');

        if ($this->forceRewrite && $this->forceNoRewrite) {
            $this->error('Cannot use --rewrite and --no-rewrite together.');
            return self::FAILURE;
        }

        if (!$this->configExists()) {
            $this->error('Flexiwind not initialized. Run flexi:init first.');
            return self::FAILURE;
        }

        $this->store->init();

        foreach ($components as $component) {
            $this->addComponent($component, is_string($namespace) ? $namespace : null, $skipDeps);
        }

        if ($this->dryRun) {
            $this->renderDryRunSummary();
            return self::SUCCESS;
        }

        if (!empty($this->createdFiles) || !empty($this->overwrittenFiles)) {
            $this->info('====== Everything installed ======');
            foreach ($this->createdFiles as $fileCreated) {
                $this->line("✓ Created : {$fileCreated}");
            }
            foreach ($this->overwrittenFiles as $fileOverwritten) {
                $this->line("↺ Overwritten : {$fileOverwritten}");
            }

            $this->renderPostInstallMessages();
            $this->info('====== Operation completed ======');
        }

        return self::SUCCESS;
    }

    private function configExists(): bool
    {
        return file_exists($this->projectRoot . '/flexiwind.yaml');
    }

    private function loadConfiguration(): void
    {
        $configPath = $this->projectRoot . '/flexiwind.yaml';
        if (!file_exists($configPath)) {
            $this->registries = [];
            $this->defaultSource = Constants::LOCAL_REGISTRY;
            return;
        }

        $config = Yaml::parseFile($configPath);
        $this->defaultSource = $config['defaultSource'] ?? Constants::LOCAL_REGISTRY;
        $this->registries = $config['registries'] ?? [];
    }

    private function addComponent(string $componentInput, ?string $namespace, bool $skipDeps = false): void
    {
        try {
            $reference = RegistryComponentReference::parse($componentInput);
        } catch (\InvalidArgumentException $e) {
            $this->warn($e->getMessage());
            return;
        }

        $source = $this->determineSource($reference, $namespace);
        $resolved = $this->fetchRegistry($reference, $source);

        if (!$resolved) {
            $this->warn("Registry not found for component: {$reference->toDisplay()}");
            return;
        }

        $registryJson = $resolved['registry'];
        $resolvedVersion = $resolved['resolvedVersion'] ?? ($registryJson['version'] ?? Constants::DEFAULT_COMPONENT_VERSION);
        $this->resolvedRegistries[] = [
            'component' => $reference->component,
            'requested' => $reference->version,
            'resolved' => $resolvedVersion,
            'url' => $resolved['url'] ?? '',
        ];

        if (!isset($registryJson['files']) || !is_array($registryJson['files'])) {
            $this->warn("Invalid registry: no files for {$reference->component}");
            return;
        }

        $storeNamespace = $reference->namespace ?? $namespace ?? 'flexiwind';
        $isInstalled = $this->store->exists($reference->component, $storeNamespace);
        $installedVersion = $this->store->getVersion($reference->component, $storeNamespace);
        $rewrite = $this->resolveRewriteDecision(
            $reference,
            $isInstalled,
            $installedVersion,
            is_string($resolvedVersion) ? $resolvedVersion : null
        );
        if ($isInstalled && !$rewrite) {
            $this->line("Skipping {$reference->component}. Use --rewrite, {$reference->component}@<version>, or upgrade {$reference->component}.");
            return;
        }

        $this->line("Adding component: {$reference->toDisplay()}");

        if (isset($registryJson['registryDependencies']) && is_array($registryJson['registryDependencies'])) {
            $this->handleRegistryDependencies($registryJson['registryDependencies'], $namespace);
        }
        if (!$skipDeps) {
            $this->handlePackageDependencies($registryJson);
        }

        if ($this->dryRun) {
            foreach ($registryJson['files'] as $file) {
                $this->processFile($file, $rewrite);
            }
        } else {
            spin(message: 'Processing files...', callback: function () use ($registryJson, $rewrite): void {
                foreach ($registryJson['files'] as $file) {
                    $this->processFile($file, $rewrite);
                }
            });
        }

        $this->installedRegistryComponents[] = $reference->component;

        if (isset($registryJson['message'])) {
            $this->collectPostInstallMessage($registryJson['message']);
        }

        if (!$this->dryRun) {
            $this->store->add(
                $reference->component,
                $storeNamespace,
                is_string($resolvedVersion) ? $resolvedVersion : Constants::DEFAULT_COMPONENT_VERSION,
                $registryJson['message'] ?? null
            );
            $this->info("{$reference->component} added successfully");
            return;
        }

        $this->line("[dry] Planned install for {$reference->toDisplay()}");
    }

    private function handleRegistryDependencies(array $registryDependencies, ?string $namespace): void
    {
        foreach ($registryDependencies as $dependency) {
            try {
                $dependencyRef = RegistryComponentReference::parse((string) $dependency);
            } catch (\InvalidArgumentException) {
                $this->warn("Invalid registry dependency reference: {$dependency}");
                continue;
            }

            if (in_array($dependencyRef->component, $this->installedRegistryComponents, true)) {
                continue;
            }

            $depNamespace = $dependencyRef->namespace ?? $namespace ?? 'flexiwind';
            if ($this->isRegistryComponentInstalled($dependencyRef, $depNamespace) && $dependencyRef->version === null) {
                $this->line("Registry dependency already installed: {$dependencyRef->component}");
                continue;
            }

            $this->line("Installing registry dependency: {$dependencyRef->toDisplay()}");
            if ($this->skipPackageInstallation) {
                $this->showPendingCommands();
            }
            $this->addComponent($dependencyRef->toDisplay(), $namespace, false);
        }
    }

    private function handlePackageDependencies(array $registryJson): void
    {
        $dependencies = $registryJson['dependencies'] ?? [];
        $devDependencies = $registryJson['devDependencies'] ?? [];
        $composerDeps = array_merge($dependencies['composer'] ?? [], $devDependencies['composer'] ?? []);
        $nodeDeps = array_merge($dependencies['node'] ?? [], $devDependencies['node'] ?? []);

        if (empty($composerDeps) && empty($nodeDeps)) {
            return;
        }

        if (count($composerDeps) > 0) {
            $this->line('Composer requires dependencies:');
            foreach ($composerDeps as $dep) {
                $this->line("  - {$dep}");
            }
        }
        if (count($nodeDeps) > 0) {
            $this->line('Node dependencies:');
            foreach ($nodeDeps as $dep) {
                $this->line("  - {$dep}");
            }
        }

        if ($this->dryRun) {
            $this->savePendingCommands($dependencies, $devDependencies);
            return;
        }

        if (!confirm('Install dependencies now?', true)) {
            $this->warn('Skipping dependency installation. You may need to install them manually.');
            $this->skipPackageInstallation = true;
            $this->savePendingCommands($dependencies, $devDependencies);
            return;
        }

        if (ProjectDetector::check_Composer($this->projectRoot) && !empty($composerDeps)) {
            $this->installComposerDependencies($dependencies['composer'] ?? [], $devDependencies['composer'] ?? []);
        }

        $packageManager = ProjectDetector::getNodePackageManager();
        if ($packageManager && file_exists($this->projectRoot . '/package.json') && !empty($nodeDeps)) {
            $this->installNodeDependencies($dependencies['node'] ?? [], $devDependencies['node'] ?? [], $packageManager);
        }
    }

    private function installComposerDependencies(array $dependencies, array $devDependencies): void
    {
        if (empty($dependencies) && empty($devDependencies)) {
            return;
        }
        $composer = PackageInstaller::composer($this->projectRoot);
        $this->line('Installing Composer dependencies...');

        foreach ($dependencies as $dep) {
            $packageName = $this->extractPackageName($dep);
            if (!$composer->isInstalled($packageName)) {
                spin(message: "Installing {$dep}...", callback: fn() => $composer->install($dep, false));
                $this->line("✓ Installed {$dep}");
            }
        }
        foreach ($devDependencies as $dep) {
            $packageName = $this->extractPackageName($dep);
            if (!$composer->isInstalled($packageName)) {
                spin(message: "Installing {$dep} (dev)...", callback: fn() => $composer->install($dep, true));
                $this->line("✓ Installed {$dep} (dev)");
            }
        }
    }

    private function installNodeDependencies(array $dependencies, array $devDependencies, string $packageManager): void
    {
        if (empty($dependencies) && empty($devDependencies)) {
            return;
        }

        $node = PackageInstaller::node($packageManager, $this->projectRoot);
        $this->line('Installing Node dependencies...');

        foreach ($dependencies as $dep) {
            $packageName = $this->extractPackageName($dep);
            if (!$node->isInstalled($packageName)) {
                spin(message: "Installing {$dep}...", callback: fn() => $node->install($dep, false));
                $this->line("✓ Installed {$dep}");
            }
        }
        foreach ($devDependencies as $dep) {
            $packageName = $this->extractPackageName($dep);
            if (!$node->isInstalled($packageName)) {
                spin(message: "Installing {$dep} (dev)...", callback: fn() => $node->install($dep, true));
                $this->line("✓ Installed {$dep} (dev)");
            }
        }
    }

    private function isRegistryComponentInstalled(RegistryComponentReference $reference, string $namespace): bool
    {
        return $this->store->exists($reference->component, $namespace);
    }

    private function extractPackageName(string $dependency): string
    {
        return explode('@', $dependency)[0];
    }

    private function determineSource(RegistryComponentReference $reference, ?string $namespace): array
    {
        if ($namespace) {
            if (!isset($this->registries[$namespace])) {
                throw new \RuntimeException("Namespace {$namespace} not found in configuration.");
            }
            return $this->parseRegistryConfig($this->registries[$namespace]);
        }

        if ($reference->namespace !== null) {
            if (!isset($this->registries[$reference->namespace])) {
                throw new \RuntimeException("Namespace {$reference->namespace} not found in configuration.");
            }

            return $this->parseRegistryConfig($this->registries[$reference->namespace]);
        }

        return ['baseUrl' => $this->defaultSource];
    }

    private function parseRegistryConfig(mixed $config): array
    {
        if (is_string($config)) {
            return ['baseUrl' => $config];
        }
        if (is_array($config)) {
            $result = ['baseUrl' => $config['url'] ?? $config['baseUrl'] ?? ''];
            if (isset($config['headers'])) {
                $result['headers'] = $this->expandEnvironmentVariables($config['headers']);
            }
            if (isset($config['params'])) {
                $result['params'] = $config['params'];
            }
            return $result;
        }
        throw new \RuntimeException('Invalid registry configuration format');
    }

    private function expandEnvironmentVariables(array $headers): array
    {
        $expanded = [];
        foreach ($headers as $key => $value) {
            $expanded[$key] = preg_replace_callback('/\$\{([^}]+)\}/', fn($matches) => $_ENV[$matches[1]] ?? $matches[0], $value);
        }
        return $expanded;
    }

    /**
     * @return array{registry: array, resolvedVersion: string|null, url: string}|null
     */
    private function fetchRegistry(RegistryComponentReference $reference, array $source): ?array
    {
        return $this->versionResolver->resolve(
            $source['baseUrl'],
            $reference->componentName,
            $reference->version,
            $source['headers'] ?? [],
            $source['params'] ?? []
        );
    }

    private function processFile(array $file, bool $rewrite): void
    {
        $targetPath = $this->projectRoot . '/' . $file['target'];
        $dir = dirname($targetPath);
        $target = (string) $file['target'];
        $exists = file_exists($targetPath);

        if ($exists && !$rewrite) {
            $this->skippedFiles[] = $target;
            $this->warn("File exists, skipping: {$target}");
            return;
        }

        if ($this->dryRun) {
            if ($exists) {
                $this->overwrittenFiles[] = $target;
                $this->line("[dry] overwrite: {$target}");
            } else {
                $this->createdFiles[] = $target;
                $this->line("[dry] create: {$target}");
            }
            return;
        }

        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        file_put_contents($targetPath, $file['content']);

        if ($exists) {
            $this->overwrittenFiles[] = $target;
            return;
        }

        $this->createdFiles[] = $target;
    }

    private function savePendingCommands(array $dependencies, array $devDependencies): void
    {
        $composerDeps = $dependencies['composer'] ?? [];
        $composerDevDeps = $devDependencies['composer'] ?? [];
        $nodeDeps = $dependencies['node'] ?? [];
        $nodeDevDeps = $devDependencies['node'] ?? [];

        if (!empty($composerDeps) && ProjectDetector::check_Composer($this->projectRoot)) {
            $this->pendingCommands[] = 'composer require ' . implode(' ', array_map('escapeshellarg', $composerDeps));
        }
        if (!empty($composerDevDeps) && ProjectDetector::check_Composer($this->projectRoot)) {
            $this->pendingCommands[] = 'composer require --dev ' . implode(' ', array_map('escapeshellarg', $composerDevDeps));
        }

        $packageManager = ProjectDetector::getNodePackageManager();
        if ($packageManager && file_exists($this->projectRoot . '/package.json')) {
            if (!empty($nodeDeps)) {
                $this->pendingCommands[] = $this->buildNodeInstallCommand($nodeDeps, false, $packageManager);
            }
            if (!empty($nodeDevDeps)) {
                $this->pendingCommands[] = $this->buildNodeInstallCommand($nodeDevDeps, true, $packageManager);
            }
        }
    }

    private function buildNodeInstallCommand(array $packages, bool $isDevDep, string $packageManager): string
    {
        $packagesString = implode(' ', array_map('escapeshellarg', $packages));
        return PackageInstaller::node($packageManager)->buildInstallCommand($packagesString, $isDevDep);
    }

    private function showPendingCommands(): void
    {
        if (count($this->pendingCommands) > 0) {
            $this->line('Manual installation required. Run:');
            foreach ($this->pendingCommands as $command) {
                $this->line("  {$command}");
            }
        }
    }

    private function collectPostInstallMessage(mixed $message): void
    {
        if (is_string($message)) {
            $trimmed = trim($message);
            if ($trimmed !== '') {
                $this->postInstallMessages[] = $trimmed;
            }
            return;
        }

        if (is_array($message)) {
            foreach ($message as $entry) {
                $this->collectPostInstallMessage($entry);
            }
        }
    }

    private function renderPostInstallMessages(): void
    {
        $messages = array_values(array_unique($this->postInstallMessages));
        if (empty($messages)) {
            return;
        }

        $this->line('');
        $this->warn('Remember to do this:');
        foreach ($messages as $message) {
            $this->line("- {$message}");
        }
    }

    private function resolveRewriteDecision(
        RegistryComponentReference $reference,
        bool $isInstalled,
        ?string $installedVersion,
        ?string $resolvedVersion
    ): bool {
        if (!$isInstalled) {
            return false;
        }

        if ($this->forceRewrite) {
            return true;
        }

        if ($this->forceNoRewrite) {
            return false;
        }

        $targetVersion = $reference->version ?? $resolvedVersion;
        if ($targetVersion !== null && $installedVersion !== null && $targetVersion !== $installedVersion) {
            if ($this->dryRun) {
                $this->line("[dry] Would update {$reference->component} from {$installedVersion} to {$targetVersion}");
                return true;
            }

            return confirm(
                "Component {$reference->component} is installed at {$installedVersion}; requested {$targetVersion}. Overwrite current files and update?",
                false
            );
        }

        if ($this->dryRun) {
            return true;
        }

        return confirm("Component {$reference->component} is already installed. Rewrite existing files?", false);
    }

    private function renderDryRunSummary(): void
    {
        $this->line('');
        $this->line('====== Dry Run Summary ======');

        if (!empty($this->resolvedRegistries)) {
            $this->line('Registry resolution:');
            foreach ($this->resolvedRegistries as $entry) {
                $requested = $entry['requested'] ? (' requested=' . $entry['requested']) : ' requested=latest';
                $resolved = $entry['resolved'] ? (' resolved=' . $entry['resolved']) : '';
                $url = $entry['url'] ? (' url=' . $entry['url']) : '';
                $this->line("  - {$entry['component']}{$requested}{$resolved}{$url}");
            }
        }

        $this->line('Files:');
        $this->line('  create: ' . count($this->createdFiles));
        $this->line('  overwrite: ' . count($this->overwrittenFiles));
        $this->line('  skip: ' . count($this->skippedFiles));

        if (!empty($this->pendingCommands)) {
            $this->line('Dependency commands (planned only):');
            foreach ($this->pendingCommands as $command) {
                $this->line('  ' . $command);
            }
        }

        $this->line('================================');
    }
}
