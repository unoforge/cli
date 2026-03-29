# Troubleshooting

## Artisan commands not found (`flexi:init`, `flexi:add`, etc.)
- Confirm `unoforge/flexiwind-cli` is in `composer.json` and `composer install` has been run.
- Confirm `FlexiLaravel\FlexiServiceProvider` is auto-discovered. Run `php artisan package:discover` if needed.

## Missing `flexiwind.yaml`
- Run `php artisan flexi:init` before using `flexi:add`, `flexi:build`, or `flexi:validate`.

## Init exits early without doing anything
- `flexiwind.yaml` already exists and is valid. Delete or edit it manually if reconfiguration is needed.

## Dependency install failures
- Verify `package.json` exists and the detected package manager lockfile is present.
- Verify Composer is available when PHP dependencies need installation.
- Use `--skip-deps` to bypass automatic installs and handle them manually.

## Not a Laravel project
- This package requires Laravel. Use `unoforge/flexi-cli` for Symfony or generic PHP projects.

## Registry validation errors
- Ensure `registry.json` follows the schema defined in `schema-item.json`.
- Use `php artisan flexi:validate --item <name>` to isolate a single failing item.
