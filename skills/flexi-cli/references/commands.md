# Commands

## Init
- `flexi-cli init`
- `flexi-cli init --new-laravel`
- `flexi-cli init --new-symfony`
- `flexi-cli init --no-flexiwind`
- `flexi-cli init --js-path=resources/js --css-path=resources/css`

## Add
- `flexi-cli add @flexiwind/button`
- `flexi-cli add @flexiwind/button @flexiwind/modal`
- `flexi-cli add card --namespace=@flexiwind`
- `flexi-cli add @flexiwind/button --skip-deps`

## Build
- `flexi-cli build`
- `flexi-cli build -o build/registries`

## Validate
- `flexi-cli validate`
- `flexi-cli validate registry.json --item button`
- `flexi-cli validate components/button.json`
