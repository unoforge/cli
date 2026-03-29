---
name: flexi-cli
description: Use this skill when the user wants to use the unoforge/flexi-cli package for project initialization, component installation, registry building, or validation via the standalone CLI binary.
---

# Flexi CLI

## Use This Skill When
- The user wants to initialize Flexiwind in a new or existing Laravel or Symfony project using `flexi-cli`.
- The user wants to add components from a registry using `flexi-cli add`.
- The user wants to build or validate a component registry using `flexi-cli build` or `flexi-cli validate`.
- The user is working outside of Laravel Artisan and needs the standalone CLI binary.

## Quick Checks
1. Confirm `flexi-cli` is installed globally or as a dev dependency.
2. Confirm `flexiwind.yaml` exists before running `add`, `build`, or `validate` (run `init` first if missing).
3. Detect JS package manager from lock file (`pnpm-lock.yaml`, `yarn.lock`, or `package-lock.json`).
4. For Symfony projects, confirm `symfony.lock` or `config/bundles.php` exists.

## Standard Workflow
1. Install the CLI:
   - Global: `composer global require unoforge/flexi-cli`
   - Dev dependency: `composer require --dev unoforge/flexi-cli`
2. Initialize the project:
   - Existing project: `flexi-cli init`
   - New Laravel project: `flexi-cli init --new-laravel`
   - New Symfony project: `flexi-cli init --new-symfony`
   - Without Flexiwind UI: `flexi-cli init --no-flexiwind`
3. Add components: `flexi-cli add @flexiwind/button`
4. Build registries: `flexi-cli build`
5. Validate registries: `flexi-cli validate`

## Expected Outputs
- `flexiwind.yaml` created and valid after `init`.
- Component files created in configured paths after `add`.
- `components.json` updated with installed component metadata.
- Registry JSON files output to `public/r/` (or custom path) after `build`.

## Constraints
- Do not use Artisan commands (`php artisan flexi:*`) in this skill — those belong to `unoforge/flexiwind-cli`.
- If `flexiwind.yaml` already exists and is valid, avoid re-initializing unless the user asks to reconfigure.
- `add`, `build`, and `validate` all require `flexiwind.yaml` to be present.

## References
- Command details: `references/commands.md`
- Troubleshooting checks: `references/troubleshooting.md`
