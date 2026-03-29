# Flexi Laravel Package

`packages/laravel` is a Laravel-native package that registers Flexi commands in Artisan.

## Commands

After installation, use:

- `php artisan flexi:init`
- `php artisan flexi:add ...`
- `php artisan flexi:fix-icons`

[Read this for more information](./docs/README.md)

## Auto-discovery

The package exposes `FlexiLaravel\FlexiServiceProvider` through Composer `extra.laravel.providers`,
so Laravel registers commands automatically.
