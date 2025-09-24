import { type Package_Manager } from "@/types";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

import prompts from "prompts";
export class ProjectDetector {
    static async askPackageManager(): Promise<Package_Manager> {
        const response = await prompts([
            {
                type: 'select',
                name: 'packageManager',
                message: 'Which package manager would you like to use?',
                choices: [
                    { title: 'npm', value: 'npm' },
                    { title: 'yarn', value: 'yarn' },
                    { title: 'pnpm', value: 'pnpm' },
                    { title: 'bun', value: 'bun' }
                ]
            }
        ])
        return response.packageManager as Package_Manager
    }

    static checkComposer(path: string): boolean {
        return existsSync(join(path, 'composer.json'));
    }
    static detect(): string {
        const path = process.cwd();

        // Laravel
        if (existsSync(join(path, 'artisan'))) {
            return 'laravel';
        }

        // Symfony
        if (existsSync(join(path, 'bin/console'))) {
            return 'symfony';
        }

        // Django
        if (existsSync(join(path, 'manage.py'))) {
            return 'django';
        }

        // Check package.json for JS frameworks
        if (this.hasPackageJson(path)) {
            const packageJson = this.getPackageJson(path);
            if (packageJson) {
                const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

                // Astro
                if ('astro' in dependencies) {
                    return 'astro';
                }

                // Nuxt
                if ('nuxt' in dependencies) {
                    return 'nuxt';
                }

                // Vue
                if ('vue' in dependencies && !('nuxt' in dependencies)) {
                    return 'vue';
                }

                // React
                if ('react' in dependencies) {
                    return 'react';
                }

                // Svelte
                if ('svelte' in dependencies || '@sveltejs/kit' in dependencies) {
                    return 'svelte';
                }

                // Vite with TypeScript
                if ('vite' in dependencies && 'typescript' in dependencies) {
                    return 'vite-ts';
                }

                // Vite vanilla JS
                if ('vite' in dependencies) {
                    return 'vite-js';
                }
            }
        }

        return 'generic';
    }

    static hasPackageJson(path: string): boolean {
        return existsSync(join(path, 'package.json'));
    }

    static getPackageJson(path: string): any | null {
        const packageJsonPath = join(path, 'package.json');
        if (!existsSync(packageJsonPath)) {
            return null;
        }

        try {
            const content = readFileSync(packageJsonPath, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            return null;
        }
    }

    static checkTailwindCSS(): boolean {
        const path = process.cwd();
        const packageJson = this.getPackageJson(path);

        if (!packageJson) {
            return false;
        }

        const dependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies
        };

        return 'tailwindcss' in dependencies;
    }

    static checkUnoCSS(): boolean {
        const path = process.cwd();
        const packageJson = this.getPackageJson(path);

        if (!packageJson) {
            return false;
        }

        const dependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies
        };

        if ('unocss' in dependencies) {
            return true;
        }

        // Check for UnoCSS config files
        const configFiles = [
            'uno.config.js',
            'uno.config.ts'
        ];

        return configFiles.some(file => existsSync(join(path, file)));
    }
}

