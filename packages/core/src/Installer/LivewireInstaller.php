<?php

namespace FlexiCore\Installer;

use FlexiCore\Installer\PackageInstaller;

class LivewireInstaller implements InstallerInterface
{
    public function install(string $packageManager, string $dir, array $options = []): void
    {
        if (PackageInstaller::node($packageManager, $dir)->isInstalled('alpinejs')) {
            PackageInstaller::node($packageManager, $dir)->remove('alpinejs');
        }
        PackageInstaller::composer($dir)->install('livewire/livewire');
    }
}
