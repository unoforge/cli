# Contributing to Flexi Core

This guide is specific to `packages/core`.

## Purpose of Core

`packages/core` is the shared logic layer for Flexi packages.

- Keep business/workflow logic here.
- Keep CLI UI and command surface outside core.

## Architecture Rules

1. No command framework classes in core.
   - Do not add Symfony Console command/input/output classes.
   - Do not add Laravel Artisan command classes.
2. Core APIs should accept plain PHP values (arrays/strings/bools/DTOs), not CLI framework objects.
3. User interaction orchestration (command options, signatures, command registration) belongs to package-specific CLI layers.

## Project Structure

- `src/Core/`: constants, schema/config/file generation internals
- `src/Service/`: reusable workflow/domain services
- `src/Installer/`: package manager installers and adapters
- `src/Utils/`: utility functions (http/file)
- `src/Libs/`: orchestration helpers used by CLI layers
- `stubs/`: scaffold templates

## Local Development

From `packages/core`:

```bash
composer install
```

Syntax check:

```bash
find src -name '*.php' -print0 | xargs -0 -n1 php -l
```

## Change Guidelines

- Prefer small, focused commits.
- Keep backward compatibility for consumers (`packages/cli`, `packages/laravel`) unless a coordinated refactor is done.
- If you change a core method signature, update both CLI packages in the same change set.
- Add concise inline comments only where logic is non-obvious.

## Testing Expectations

There is no full automated suite yet. For core changes:

1. Run syntax checks in core.
2. Smoke test impacted commands via consumers:
   - Symfony CLI (`packages/cli`)
   - Laravel Artisan (`packages/laravel`)
3. Validate generated files when touching stubs/generation logic.

## Pull Request Checklist

- [ ] Change stays within core scope
- [ ] No command-framework objects leaked into core APIs
- [ ] Syntax checks pass
- [ ] Consumer packages remain functional
- [ ] Docs updated when behavior changes
