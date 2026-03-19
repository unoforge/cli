# validate

Validate registry items against the JSON schema.

## Synopsis

```bash
php artisan flexi:validate [file] [--item|-i <name>]
```

- `file`: Path to registry file to validate (default `registry.json`)

## Options

- `--item, -i <name>`: Validate a single item by name (for multi-item `registry.json`)

## Behavior

- Loads schema from the configured URL
- Supports validating a single registry item file or a multi-item `registry.json` with `items` array
- Prints detailed errors and marks process as failed if invalid

## Examples

```bash
# Validate default registry.json
php artisan flexi:validate

# Validate a single item
php artisan flexi:validate registry.json --item button

# Validate a standalone item file
php artisan flexi:validate components/button.json
```
