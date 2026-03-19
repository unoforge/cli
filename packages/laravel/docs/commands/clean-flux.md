# clean:flux



Remove Livewire Flux package and clean up related files.

> **Note:** This command is currently experimental and not ready for production. Use at your own risk.

## Synopsis

```bash
php artisan flexi:clean-flux [--force|-f]
```

## Options

- `--force, -f`: Skip confirmation prompts

## Behavior

- If not forced, asks for confirmation
- Removes `livewire/flux` via Composer if installed
- Deletes known Flux-related view directories and files under `resources/views`

## Examples

```bash
# Interactive cleanup
php artisan flexi:clean-flux

# Non-interactive
php artisan flexi:clean-flux --force
```
