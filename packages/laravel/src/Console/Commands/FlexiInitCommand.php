<?php

namespace FlexiLaravel\Console\Commands;

use FlexiCore\Core\Constants;
use FlexiCore\Libs\FlexiwindInitializer;
use FlexiCore\Service\ProjectCreator;
use FlexiCore\Service\ThemingInitializer;
use Illuminate\Console\Command;
use Symfony\Component\Yaml\Yaml;

use function Laravel\Prompts\info;

class FlexiInitCommand extends Command
{
    protected $signature = 'flexi:init
        {--new-laravel : Create a new Laravel project}
        {--no-flexiwind : Initialize without Flexiwind UI}
        {--js-path=resources/js : Path to JavaScript files}
        {--css-path=resources/css : Path to CSS files}';

    protected $description = 'Initialize Flexiwind in a Laravel project';

    public function __construct(
        private readonly ProjectCreator $projectCreator = new ProjectCreator(),
        private readonly ThemingInitializer $themingInitializer = new ThemingInitializer(),
        private readonly FlexiwindInitializer $flexiwindInitializer = new FlexiwindInitializer(),
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        $isFlexiwind = !$this->option('no-flexiwind');

        $this->displayName();

        if ($this->checkIsInitialized()) {
            $this->warn('Flexiwind has already been initialized in this project. No further action is needed.');
            return self::SUCCESS;
        }

        $projectAnswers = [];
        $initProjectFromCli = false;

        if ((bool) $this->option('new-laravel')) {
            $projectAnswers = $this->projectCreator->createLaravel();
            $initProjectFromCli = true;
        } else {
            if (!file_exists(getcwd() . '/composer.json')) {
                $this->warn('No composer.json found. A new Laravel project will be created.');
                $projectAnswers = $this->projectCreator->createLaravel();
                $initProjectFromCli = true;
            } else {
                $livewire = $this->projectCreator->askLivewire();
                $alpine = !$livewire ? $this->projectCreator->askAlpine() : false;
                $projectAnswers = compact('livewire', 'alpine') + ['fromStarter' => false];
            }
        }

        if ($initProjectFromCli && empty($projectAnswers)) {
            return self::FAILURE;
        }

        if (!empty($projectAnswers['fromStarter'])) {
            info('Starter projects are not yet implemented.');
            return self::SUCCESS;
        }

        $projectPath = $initProjectFromCli
            ? $projectAnswers['projectPath'] ?? getcwd() . '/' . ($projectAnswers['name'] ?? 'my-app')
            : getcwd();

        $packageManager = $this->detectPackageManager($projectPath);
        $themingAnswers = $this->themingInitializer->askTheming($isFlexiwind);

        if ($isFlexiwind) {
            $summary = $this->flexiwindInitializer->initialize(
                'laravel',
                $packageManager,
                $projectAnswers,
                $themingAnswers,
                $projectPath,
                [
                    'jsPath' => $this->option('js-path'),
                    'cssPath' => $this->option('css-path'),
                ]
            );

            $this->line('===================================');
            foreach ($summary as $line) {
                $this->line($line);
            }
            $this->line('===================================');
            $this->info('Flexiwind Setup Completed');
        } else {
            info('Initialization without Flexiwind is not yet implemented.');
        }

        return self::SUCCESS;
    }

    private function detectPackageManager(string $projectPath): string
    {
        $lockFiles = [
            'pnpm-lock.yaml' => 'pnpm',
            'yarn.lock' => 'yarn',
            'package-lock.json' => 'npm',
        ];

        foreach ($lockFiles as $lockFile => $manager) {
            if (file_exists($projectPath . DIRECTORY_SEPARATOR . $lockFile) || file_exists(getcwd() . DIRECTORY_SEPARATOR . $lockFile)) {
                return $manager;
            }
        }

        return 'npm';
    }

    private function checkIsInitialized(): bool
    {
        $configFile = getcwd() . '/' . Constants::CONFIG_FILE;
        if (!file_exists($configFile)) {
            return false;
        }

        try {
            $config = Yaml::parseFile($configFile);
            $requiredKeys = ['framework', 'defaultSource', 'registries'];
            foreach ($requiredKeys as $key) {
                if (!isset($config[$key])) {
                    return false;
                }
            }

            return is_array($config['registries']) && !empty($config['registries']);
        } catch (\Exception) {
            return false;
        }
    }

    private function displayName(): void
    {
        $this->line(<<<'ASCII'
<fg=red>
  ███████╗██╗     ███████╗██╗  ██╗██╗      ██████╗██╗     ██╗
  ██╔════╝██║     ██╔════╝╚██╗██╔╝██║     ██╔════╝██║     ██║
  █████╗  ██║     █████╗   ╚███╔╝ ██║     ██║     ██║     ██║
  ██╔══╝  ██║     ██╔══╝   ██╔██╗ ██║     ██║     ██║     ██║
  ██║     ███████╗███████╗██╔╝ ██╗██║     ╚██████╗███████╗██║
  ╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝╚══════╝╚═╝
  Laravel-native Flexi command
</>
ASCII);
    }
}
