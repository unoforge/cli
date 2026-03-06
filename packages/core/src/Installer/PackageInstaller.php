<?php

namespace FlexiCore\Installer;
use FlexiCore\Installer\NodePackageInstaller;
use FlexiCore\Installer\ComposerInstaller;

class PackageInstaller
{
    public static function composer(?string $workingDir = null): ComposerInstaller
    {
        return new ComposerInstaller($workingDir);
    }

    public static function node(string $packageManager, ?string $workingDir = null): NodePackageInstaller
    {
        return new NodePackageInstaller($packageManager, $workingDir ?? getcwd());
    }
}
