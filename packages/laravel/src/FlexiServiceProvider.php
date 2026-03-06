<?php

namespace FlexiLaravel;

use FlexiLaravel\Console\Commands\FlexiAddCommand;
use FlexiLaravel\Console\Commands\FlexiBuildCommand;
use FlexiLaravel\Console\Commands\FlexiCleanFluxCommand;
use FlexiLaravel\Console\Commands\FlexiFixIconsCommand;
use FlexiLaravel\Console\Commands\FlexiInitCommand;
use Illuminate\Support\ServiceProvider;

class FlexiServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                FlexiInitCommand::class,
                FlexiAddCommand::class,
                FlexiBuildCommand::class,
                FlexiFixIconsCommand::class,
                FlexiCleanFluxCommand::class,
            ]);
        }
    }
}
