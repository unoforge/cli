# Flexi CLI Monorepo

This repository is organized into three packages:

- `packages/core`: shared and main logic for Flexi CLI (`FlexiCore\\` namespace).
- `packages/cli`: full PHP CLI binary (`flexi-cli`) for Laravel + Symfony + generic registry workflows.
- `packages/laravel`: Laravel-native package that registers `flexi:*` Artisan commands.

## Skills

- `skills/laravel-flexiwind`: reusable skill for Laravel + Flexiwind setup and command usage.

## Local package linking

Each package uses Composer path repositories. Run Composer install inside each package as needed.
