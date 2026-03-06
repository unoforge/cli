# Flexi Core Package

`packages/core` contains shared application logic used by both CLI distributions.

## Scope

- Namespace: `FlexiCore\\`
- Shared domain and infrastructure logic only:
  - `src/Core/` (config, registries, generation helpers)
  - `src/Service/` (framework detection, setup logic, theming helpers)
  - `src/Installer/` (composer/node installers)
  - `src/Utils/` (file/http helpers)
  - `src/Libs/` (orchestration helpers)
  - `stubs/` (template assets)

## Non-Goals

`packages/core` must not contain CLI presentation/UI layers:

- No Symfony Console command classes (`Symfony\\Component\\Console\\Command\\*`)
- No Laravel Artisan command classes (`Illuminate\\Console\\Command`)
- No CLI argument parsing concerns (options/arguments/signatures)

Those belong to:

- `packages/cli` for the Symfony Console distribution
- `packages/laravel` for the Laravel Artisan distribution

## Dependency Boundary

Core may depend on reusable runtime libraries (yaml, process, http client, prompts), but must stay command-framework agnostic.

## Consumers

- `unoforge/flexi-cli`
- `unoforge/flexi-laravel`
