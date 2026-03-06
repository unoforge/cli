---
name: laravel-flexiwind
description: Use this skill when the user wants Laravel-only Flexiwind CLI workflows, including project initialization, component installation, icon migration, and Flux cleanup.
---

# Laravel Flexiwind

## Use This Skill When
- The user asks for Flexiwind setup in a Laravel app.
- The user wants to run Laravel-specific Flexiwind commands (`init`, `add`, `fix-icons`, `clean:flux`).
- The user wants a Laravel-only CLI flow rather than Symfony or generic PHP paths.

## Quick Checks
1. Confirm this is a Laravel project (`artisan` exists) unless creating a new project.
2. Confirm `composer.json` exists (or run new Laravel creation flow).
3. Detect JS package manager from lock file (`pnpm-lock.yaml`, `yarn.lock`, or `package-lock.json`).

## Standard Workflow
1. Initialize Flexiwind for Laravel:
   - Existing project: `flexi-laravel init`
   - New project: `flexi-laravel init --new-laravel`
2. Add components:
   - `flexi-laravel add button card`
   - Use `--namespace` when requested.
3. Normalize icons after library changes:
   - `flexi-laravel fix-icons`
4. Remove Flux scaffolding if requested:
   - `flexi-laravel clean:flux`

## Expected Outputs
- `flexiwind.yaml` created and valid.
- Laravel helper files in `app/Flexiwind/`.
- Base layout in `resources/views/layouts/base.blade.php`.
- Flexiwind CSS/JS files generated in configured folders.

## Constraints
- Do not use Symfony setup paths in this skill.
- Keep edits compatible with existing Laravel app structure.
- If `flexiwind.yaml` already exists and is valid, avoid re-initializing unless user asks to reconfigure.

## References
- Command details: `references/commands.md`
- Troubleshooting checks: `references/troubleshooting.md`
