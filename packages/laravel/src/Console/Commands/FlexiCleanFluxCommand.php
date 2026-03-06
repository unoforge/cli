<?php

namespace FlexiLaravel\Console\Commands;

use FlexiCore\Installer\PackageInstaller;
use FlexiCore\Utils\FileUtils;
use Illuminate\Console\Command;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\info;
use function Laravel\Prompts\spin;

class FlexiCleanFluxCommand extends Command
{
    protected $signature = 'flexi:clean-flux {--force : Skip confirmation prompts}';

    protected $description = 'Remove Livewire Flux package and related files';

    private string $projectRoot;

    public function __construct()
    {
        parent::__construct();
        $this->projectRoot = getcwd();
    }

    public function handle(): int
    {
        $force = (bool) $this->option('force');

        if (!$force && !confirm('This will remove Livewire Flux and all related files. Continue?', false)) {
            info('Operation cancelled.');
            return self::SUCCESS;
        }

        $this->removeFluxPackage();
        $this->cleanFluxFiles();
        $this->info('Livewire Flux cleanup complete!');

        if (!$force) {
            confirm('Now the CLI can regenerate starters without Flux. Continue?', false);
        }

        return self::SUCCESS;
    }

    private function removeFluxPackage(): void
    {
        $composer = PackageInstaller::composer($this->projectRoot);
        if ($composer->isInstalled('livewire/flux')) {
            spin(message: 'Removing Livewire Flux package...', callback: fn() => $composer->remove('livewire/flux'));
            $this->info('Livewire Flux package removed');
            return;
        }

        $this->line('Livewire Flux package not found');
    }

    private function cleanFluxFiles(): void
    {
        $fluxPaths = [
            'resources/views/flux',
            'resources/views/components/layouts/auth',
            'resources/views/components/layouts/app',
            'resources/views/components/layouts/app.blade.php',
            'resources/views/components/layouts/auth.blade.php',
            'resources/views/dashboard.blade.php',
            'resources/views/partials',
            'resources/views/livewire/settings',
            'resources/views/livewire/auth',
            'resources/views/components/settings',
            'resources/views/components/action-message.blade.php',
            'resources/views/components/app-logo-icon.blade.php',
            'resources/views/components/app-logo.blade.php',
            'resources/views/components/auth-header.blade.php',
            'resources/views/components/auth-session-status.blade.php',
            'resources/views/components/placeholder-pattern.blade.php',
        ];

        foreach ($fluxPaths as $path) {
            $fullPath = $this->projectRoot . '/' . $path;
            if (file_exists($fullPath)) {
                spin(message: "Removing {$path}...", callback: fn() => FileUtils::deleteDirectory($fullPath));
            }
        }
    }
}
