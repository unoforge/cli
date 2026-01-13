import { type Package_Manager } from "@/types";
import { existsSync, readFileSync } from "fs";
import { basename, join } from "path";
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



    static detect(): string {
        const path = process.cwd();

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
                    'tanstack-start': '@tanstack/react-start',
                    'react-router': '@react-router/node',
                    'inertia-react': '@inertiajs/react',
                    'next': 'next',
                    'react': 'react',
                };

                for (const [framework, keys] of Object.entries(frameworkDetectors)) {
                    const keysToCheck = Array.isArray(keys) ? keys : [keys];
                    if (keysToCheck.some(key => key in dependencies)) {
                        return framework;
                    }
                }

                if ('vite' in dependencies) {
                    if ('@vitejs/plugin-react' in dependencies || '@vitejs/plugin-react-swc' in dependencies) {
                        return 'react';
                    }
                    return 'typescript' in dependencies ? 'vite-ts' : 'vite-js';
                }
            }
        }

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

    static checkCSSFramework(framework: 'tailwindcss'): boolean {
        const path = process.cwd();
        const packageJson = this.getPackageJson(path);

        if (packageJson) {
            const dependencies = {
                ...packageJson.dependencies,
                ...packageJson.devDependencies
            };

            if (framework === 'tailwindcss' && 'tailwindcss' in dependencies) return true;
        }

        return false;
    }

    // Deprecated in favor of generic checkCSSFramework, but kept for compatibility if needed
    // Actually, let's keep them and make them call the generic one to not break other files.
    static checkTailwindCSS(): boolean {
        return this.checkCSSFramework('tailwindcss');
    }

    static getProjectName(): string {
        const path = process.cwd();
        const packageJson = this.getPackageJson(path);
        if (packageJson && packageJson.name) {
            return packageJson.name;
        }
        return basename(path);
    }

    static hasSrcDir(): boolean {
        return existsSync(join(process.cwd(), 'src'));
    }

    static isTypeScript(): boolean {
        const path = process.cwd();
        return existsSync(join(path, 'tsconfig.json'));
    }
}

