# Troubleshooting

## `flexi-cli` command not found
- If installed globally, ensure Composer's global bin is in `$PATH` (typically `~/.composer/vendor/bin` or `~/.config/composer/vendor/bin`).
- If installed as a dev dependency, run via `vendor/bin/flexi-cli`.

## Missing `flexiwind.yaml`
- Run `flexi-cli init` before using `add`, `build`, or `validate`.

## Init exits early without doing anything
- `flexiwind.yaml` already exists and is valid. Delete or edit it manually if reconfiguration is needed.

## Dependency install failures
- Verify `package.json` exists and the detected package manager lockfile is present.
- Verify Composer is available when PHP dependencies need installation.
- Use `--skip-deps` to bypass automatic installs and handle them manually.

## Framework not detected
- For a new Laravel project use `--new-laravel`; for Symfony use `--new-symfony`.
- For an existing project, confirm `artisan` (Laravel) or `symfony.lock` / `config/bundles.php` (Symfony) is present.

## Registry validation errors
- Ensure `registry.json` follows the schema defined in `schema-item.json`.
- Use `flexi-cli validate --item <name>` to isolate a single failing item.
