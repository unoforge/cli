# init

Initialize Flexiwind in your project.

## Synopsis

```bash
php artisan flexi:init [--js-path <path>] [--css-path <path>]
```

## Description

Runs an interactive setup to initialize Flexiwind in a new or existing project. Detects package manager, then configures theming and optional UI scaffolding.

If `flexiwind.yaml` already exists and is valid, the command exits early.

## Options

- `--no-flexiwind`: Initialize without Flexiwind UI
- `--js-path <path>`: Path to JavaScript files (default `resources/js`)
- `--css-path <path>`: Path to CSS files (default `resources/css`)

## Examples

```bash
php artisan flexi:cli init
```

Without using flexiwind ui

```bash
php artisan flexi:cli init --no-flexiwind
```
