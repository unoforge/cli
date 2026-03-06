<?php

namespace FlexiLaravel\Console\Commands;

use FlexiCore\Core\Constants;
use FlexiCore\Core\RegistryBuilder;
use Illuminate\Console\Command;

use function Laravel\Prompts\error;
use function Laravel\Prompts\info;

class FlexiBuildCommand extends Command
{
    protected $signature = 'flexi:build
        {--output= : Output directory name (relative to current directory)}
        {--schema=registry.json : The schema file to build from}';

    protected $description = 'Build registries from schema file';

    public function handle(): int
    {
        $builder = new RegistryBuilder();
        $outputDir = (string) ($this->option('output') ?: Constants::DEFAULT_BUILD_OUTPUT);
        $schemaPath = (string) $this->option('schema');
        $cleanOutputDir = trim($outputDir, '/\\');
        $fullOutputPath = getcwd() . DIRECTORY_SEPARATOR . $cleanOutputDir;

        try {
            if (!file_exists($schemaPath)) {
                error("Schema file not found: {$schemaPath}");
                return self::FAILURE;
            }

            $builder->build($schemaPath, $fullOutputPath);
            info("Registries built successfully in: {$cleanOutputDir}");
        } catch (\Exception $e) {
            error($e->getMessage());
            return self::FAILURE;
        }

        return self::SUCCESS;
    }
}
