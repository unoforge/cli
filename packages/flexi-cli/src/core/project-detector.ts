import { type Package_Manager } from "@/types";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import prompts from "prompts";

interface PackageJson {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    [key: string]: any;
}

export class ProjectDetector {
    private static packageJsonCache: Map<string, PackageJson | null> = new Map();

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
        ]);
        return response.packageManager as Package_Manager;
    }

    static checkComposer(path: string): boolean {
        return existsSync(join(path, 'composer.json'));
    }

    static detect(): string {
        const path = process.cwd();

        const markers: Record<string, string> = {
            'artisan': 'laravel',
            'bin/console': 'symfony',
            'manage.py': 'django'
        };

        for (const [marker, framework] of Object.entries(markers)) {
            if (existsSync(join(path, marker))) {
                return framework;
            }
        }

        if (this.hasPackageJson(path)) {
            const packageJson = this.getPackageJson(path);
            if (packageJson) {
                const dependencies = {
                    ...packageJson.dependencies,
                    ...packageJson.devDependencies
                };

                const frameworkDetectors: Record<string, string | string[]> = {
                    'astro': 'astro',
                    'rasengan': 'rasengan',
                    'nuxt': 'nuxt',
                    'vue': 'vue',
                    'react': 'react',
                    'svelte': ['svelte', '@sveltejs/kit']
                };

                for (const [framework, keys] of Object.entries(frameworkDetectors)) {
                    const keysToCheck = Array.isArray(keys) ? keys : [keys];
                    if (keysToCheck.some(key => key in dependencies)) {
                        if (framework === 'vue' && 'nuxt' in dependencies) continue;
                        return framework;
                    }
                }

                if ('vite' in dependencies) {
                    return 'typescript' in dependencies ? 'vite-ts' : 'vite-js';
                }
            }
        }

        return 'generic';
    }

    static hasPackageJson(path: string): boolean {
        return existsSync(join(path, 'package.json'));
    }

    static getPackageJson(path: string): PackageJson | null {
        if (this.packageJsonCache.has(path)) {
            return this.packageJsonCache.get(path)!;
        }

        const packageJsonPath = join(path, 'package.json');
        if (!existsSync(packageJsonPath)) {
            this.packageJsonCache.set(path, null);
            return null;
        }

        try {
            const content = readFileSync(packageJsonPath, 'utf-8');
            const parsed = JSON.parse(content);
            this.packageJsonCache.set(path, parsed);
            return parsed;
        } catch (error) {
            this.packageJsonCache.set(path, null);
            return null;
        }
    }

    static checkCSSFramework(framework: 'tailwindcss' | 'unocss'): boolean {
        const path = process.cwd();
        const packageJson = this.getPackageJson(path);

        if (packageJson) {
            const dependencies = {
                ...packageJson.dependencies,
                ...packageJson.devDependencies
            };

            if (framework === 'tailwindcss' && 'tailwindcss' in dependencies) return true;
            if (framework === 'unocss' && 'unocss' in dependencies) return true;
        }

        if (framework === 'unocss') {
            const configFiles = ['uno.config.js', 'uno.config.ts'];
            return configFiles.some(file => existsSync(join(path, file)));
        }

        return false;
    }

    // Deprecated in favor of generic checkCSSFramework, but kept for compatibility if needed
    // Actually, let's keep them and make them call the generic one to not break other files.
    static checkTailwindCSS(): boolean {
        return this.checkCSSFramework('tailwindcss');
    }

    static checkUnoCSS(): boolean {
        return this.checkCSSFramework('unocss');
    }

    static isTypeScript(): boolean {
        const path = process.cwd();
        return existsSync(join(path, 'tsconfig.json'));
    }
}

