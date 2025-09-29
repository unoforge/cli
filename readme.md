# Flexi CLI

A CLI tool for rapidly scaffolding websites using Flexiwind or UnoUI.


## Overview

Flexi CLI is a command-line interface tool designed to help developers quickly set up and configure web applications. It supports multiple JavaScript frameworks and provides theming capabilities out of the box.

## Features

- 🚀 **Multiple Framework Support**: Works with Astro, Vue, Svelte, and Vite
- 🎨 **CSS Framework Integration**: Choose between Tailwind CSS and UnoCSS
- 🧩 **Starter Templates**: Quickly bootstrap projects with pre-configured templates
- 🌈 **Theming Support**: Built-in themes (Air, Earth, Fire, Water) for rapid styling
- 🔧 **Automatic Configuration**: Sets up all necessary configuration files
- 📦 **Icon Library Integration**: Includes popular icon libraries

## Installation

You can use Flexi CLI without installing it by using npx:

```bash
npx flexi-cli@latest init
```

Or install it globally:

```bash
npm install -g flexi-cli
```

## Usage

### Initialize a New Project

The primary command is `init`, which can be used to create a new project or configure an existing one:

```bash
npx flexi-cli@latest init
```

This interactive command will guide you through the setup process, asking for your preferences regarding:

- Project framework (Astro, Vue, Svelte, Vite)
- CSS framework (Tailwind or UnoCSS)
- Theming options
- Icon libraries

### Command Options

You can also specify options directly in the command:

```bash
npx flexi-cli@latest init --styles tailwind --new vite-ts
```

#### Available Options

- `--styles <framework>`: CSS framework to use (tailwind|unocss)
- `--starter <starter>`: Starter template to use (astro|vite|vue|svelte)
- `--new <framework>`: Target framework for the project (astro|vite|vite-ts|vue|vue-ts|svelte|svelte-ts)
- `--js-path <path>`: Path to the JavaScript/TS entry file (for Vite Vanilla and Astro)
- `--css-path <path>`: Path to the CSS file (for Vite Vanilla and Astro)

## The `npx flexi-cli@latest init` Command

The `init` command is the primary entry point for Flexi CLI. When you run `npx flexi-cli@latest init`, the following process occurs:

1. **Project Detection**: The CLI checks if you're in an existing project or need to create a new one
2. **Framework Selection**: If no project exists, you'll be prompted to select a framework
3. **CSS Framework Selection**: Choose between Tailwind CSS and UnoCSS
4. **Theming Options**: Select from built-in themes or use the default
5. **Configuration Generation**: The CLI generates all necessary configuration files
6. **Dependency Installation**: Required dependencies are automatically installed

### Using Starter Templates

If you prefer to use a pre-configured starter template, the CLI offers several options:

```bash
npx flexi-cli@latest init --starter astro
```

This will clone a starter template with the selected framework and CSS configuration, saving you time on initial setup.

### Creating a New Project

To create a brand new project with specific settings:

```bash
npx flexi-cli@latest init --new vue-ts --styles tailwind
```

This command will:

1. Create a new Vue.js project with TypeScript
2. Configure Tailwind CSS
3. Set up the necessary file structure
4. Install all required dependencies

## Examples

### Create a new Vue.js project with Tailwind CSS

```bash
npx flexi-cli@latest init --new vue --styles tailwind
```

### Create a new Astro project with UnoCSS

```bash
npx flexi-cli@latest init --new astro --styles unocss
```

### Use a starter template

```bash
npx flexi-cli@latest init --starter astro
```

## Themes

Flexi CLI comes with several built-in themes:

- Air
- Earth
- Fire
- Water
- Default Flexiwind

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

Johnkat MJ

---

Built with ❤️ by the Johnkat MJ