<?php

namespace FlexiCore\Libs;

use FlexiCore\Core\{ConfigWriter, FileGenerator};
use FlexiCore\Installer\PackageInstaller;
use FlexiCore\Installer\{LivewireInstaller, AlpineInstaller, StimulusInstaller, TailwindInstaller, IconLibraryInstaller};

use function Laravel\Prompts\{spin, text};

class FlexiwindInitializer
{
    private array $completedActions = [];

    public function initialize(
        string $projectType,
        string $packageManager,
        array $projectAnswers,
        array $themingAnswers,
        string $projectPath,
        array $paths = [],
    ): array {
        $this->completedActions = [];
        $jsPath = $projectType === 'symfony'
            ? ($paths['jsPath'] ?? 'assets/js')
            : ($paths['jsPath'] ?? 'resources/js');
        $cssPath = $projectType === 'symfony'
            ? ($paths['cssPath'] ?? 'assets/styles')
            : ($paths['cssPath'] ?? 'resources/css');
        $folders['css'] = text('Where do you want to place your main CSS files', $cssPath, $cssPath);
        $folders['js']  = text('Where do you want to place your JS files', $jsPath, $jsPath);
        $folders['framework'] = $projectType;
        $answers = array_merge($projectAnswers, $folders, $themingAnswers);

        $plan = [];

        // Laravel-specific
        if ($projectType === 'laravel') {
            if (!empty($answers['livewire'])) {
                $plan[] = 'livewire';
            } elseif (!empty($answers['alpine'])) {
                $plan[] = 'alpine';
            }
        }

        // Symfony-specific
        if ($projectType === 'symfony' && !empty($answers['stimulus'])) {
            $plan[] = 'stimulus';
        }
        $cssFramework = $answers['cssFramework'] ?? null;

        // CSS Framework
        if ($cssFramework === 'tailwindcss') {
            $plan[] = 'tailwindcss';
        }


        // Icon Library
        if ($answers['iconLibrary'] != null) {
            $plan[] = 'iconLibrary';
        }

        // Config + base files
        spin(fn() => [$this->createConfigFiles($answers), $this->generateBaseFiles($projectType, $answers)], "Setting up config files...");




        spin(fn() => PackageInstaller::node($packageManager)->install(''), "Installing dependencies");
        // Installers (strategy-based)
        $installers = [
            'livewire'   => new LivewireInstaller($answers),
            'alpine'     => new AlpineInstaller(),
            'stimulus'   => new StimulusInstaller(),
            'tailwindcss' => new TailwindInstaller(),
            'iconLibrary' => new IconLibraryInstaller($answers),
        ];

        $icon = $answers['iconLibrary'] ?? '';

        foreach ($plan as $key) {
            spin(fn() => $this->runInstaller($installers[$key], $packageManager, $projectPath, $answers, $key, $icon), "Installing {$key}...");
        }
        $this->completedActions[] = "<fg=green>✓ Packages Installation Completed</>";
        $this->addInstallationCompleted($plan, $icon, $cssFramework);
        return $this->completedActions;
    }

    private function createConfigFiles(array $answers): void
    {
        ConfigWriter::createFlexiwindYaml($answers);
        $this->completedActions[] = "<fg=green>⇒ Created: flexiwind.yaml</>";
    }

    private static function getIconInstalled($cssFramework, $icon)
    {
        return $cssFramework === 'tailwindcss' ? '@iconify/tailwind4 and ' . $icon . ' Icons' : $icon . ' Icons';
    }

    private function addInstallationCompleted($plan, $icon, $cssFramework)
    {
        foreach ($plan as $key) {
            $installed = $key == 'iconLibrary' ? self::getIconInstalled($cssFramework, $icon) : $key;
            $this->completedActions[] = "<fg=green>✓ Installed: " . $installed . "</>";
        }
    }

    private function generateBaseFiles(string $projectType, array $answers): void
    {
        FileGenerator::generateBaseFiles($projectType, $answers);

        // Track created files based on project type
        if ($projectType === 'laravel') {
            $this->completedActions[] = "<fg=green>⇒ Created: app/Flexiwind/UiHelper.php</>";
            $this->completedActions[] = "<fg=green>⇒ Created: app/Flexiwind/ButtonHelper.php</>";
            $this->completedActions[] = "<fg=green>⇒ Created: resources/views/layouts/base.blade.php</>";
            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/app.css</>";
            $this->completedActions[] = "<fg=yellow>⇒ TODO: Don't forget to add 'resources/js/flexilla.js' in your vite config</>";
        } else {
            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/styles.css</>";
        }

        $this->completedActions[] = "<fg=green>⇒ Created: {$answers['js']}/flexilla.js</>";
        if ($answers['cssFramework'] === 'tailwindcss') {
            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/flexiwind/base.css</>";
            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/flexiwind/button.css</>";
            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/flexiwind/form.css</>";
            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/flexiwind/ui.css</>";
            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/flexiwind/utils.css</>";


            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/button-styles.css</>";
            $this->completedActions[] = "<fg=green>⇒ Created: {$answers['css']}/ui-utilities.css</>";
        }
    }

    private function runInstaller($installer, string $packageManager, string $projectPath, array $answers, string $type, $icon): void
    {
        $installer->install($packageManager, $projectPath, $answers);
    }

}
