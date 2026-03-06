# Troubleshooting

## Missing autoload
- Ensure dependencies are installed for the package that owns the binary.

## Missing config
- If `flexiwind.yaml` is missing, run `flexi-laravel init`.

## Dependency install failures
- Verify the project has `package.json` and the detected package manager lockfile.
- Verify Composer is available when Livewire needs installation.

## Not a Laravel project
- If no `artisan` exists, create a new project with `flexi-laravel init --new-laravel`.
