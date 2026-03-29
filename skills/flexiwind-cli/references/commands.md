# Commands

## Init
- `php artisan flexi:init`
- `php artisan flexi:init --no-flexiwind`
- `php artisan flexi:init --js-path=resources/js --css-path=resources/css`

## Add
- `php artisan flexi:add @flexiwind/button`
- `php artisan flexi:add @flexiwind/button @flexiwind/modal`
- `php artisan flexi:add card --namespace=@flexiwind`
- `php artisan flexi:add @flexiwind/button --skip-deps`

## Build
- `php artisan flexi:build`
- `php artisan flexi:build -o build/registries`

## Validate
- `php artisan flexi:validate`
- `php artisan flexi:validate registry.json --item button`
- `php artisan flexi:validate components/button.json`
