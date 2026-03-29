---
name: flexiwind-cli
description: Use this skill when the user wants to use the unoforge/flexiwind-cli package to run Flexiwind Artisan commands inside a Laravel project.
---

# Flexiwind CLI (Laravel Artisan)

## Use This Skill When
- The user wants to initialize Flexiwind inside an existing Laravel project using Artisan.
- The user wants to add components via `php artisan flexi:add`.
- The user wants to build or validate a component registry via Artisan commands.
- The user prefers Artisan over the standalone `flexi-cli` binary.

## Quick Checks
1. Confirm this is a Laravel project (`artisan` exists).
2. Confirm `unoforge/flexiwind-cli` is installed (`composer.json` lists it as a dependency).
3. Confirm `FlexiLaravel\FlexiServiceProvider` is registered (auto-discovered via Composer `extra.laravel.providers`).
4. Confirm `flexiwind.yaml` exists before running `add`, `build`, or `validate` (run `flexi:init` first if missing).
5. Detect JS package manager from lock file (`pnpm-lock.yaml`, `yarn.lock`, or `package-lock.json`).

## Standard Workflow
1. Install the package:
   - `composer require --dev unoforge/flexiwind-cli`
2. Initialize Flexiwind:
   - `php artisan flexi:init`
   - Without Flexiwind UI: `php artisan flexi:init --no-flexiwind`
3. Add components: `php artisan flexi:add @flexiwind/button`
4. Build registries: `php artisan flexi:build`
5. Validate registries: `php artisan flexi:validate`

## Expected Outputs
- `flexiwind.yaml` created and valid after `flexi:init`.
- Component files created in configured paths after `flexi:add`.
- `components.json` updated with installed component metadata.
- Registry JSON files output to `public/r/` (or custom path) after `flexi:build`.

## Constraints
- Do not use the standalone `flexi-cli` binary commands in this skill — those belong to `unoforge/flexi-cli`.
- This package does not support `--new-laravel` or `--new-symfony` flags; it assumes an existing Laravel project.
- If `flexiwind.yaml` already exists and is valid, avoid re-initializing unless the user asks to reconfigure.
- `add`, `build`, and `validate` all require `flexiwind.yaml` to be present.

## References
- Command details: `references/commands.md`
- Troubleshooting checks: `references/troubleshooting.md`
