
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { StubStorage } from './stub-storage';
import { CssStyleCompose } from '../helpers/css-style-compose';
import { ProjectAnswers } from '../types';
import { DIR_PERMISSIONS, NEXTJS_REGISTY_URL, REGISTY_URL } from './const';
import { ProjectDetector } from './project-detector';


export class FileGenerator {
    static generateBaseFiles(framework: string, answers: ProjectAnswers): void {
        const mainCssFileName = this.getMainCssFileName();

        this.createFlexiwindFiles(answers, mainCssFileName);
        this.createFrameworkSpecificFiles(framework, answers);
        this.generateConfigFiles(answers);
    }

    private static createShared(answers: ProjectAnswers): void {

        const cssFolder = answers.cssPath || 'src/css/';


        if (!existsSync(cssFolder)) {
            mkdirSync(cssFolder, { recursive: true, mode: DIR_PERMISSIONS });
        }
        if (!existsSync(`${cssFolder}/flexiwind`)) {
            mkdirSync(`${cssFolder}/flexiwind`, { recursive: true, mode: DIR_PERMISSIONS });
        }


    }

    private static createFlexiwindFiles(answers: ProjectAnswers, mainCssFileName: string): void {
        const hasSrc = ProjectDetector.hasSrcDir();
        const cssFolder = answers.cssPath || (hasSrc ? 'src/' : './');
        const themingMode = answers.themingMode || 'light';
        const theme = answers.theme || 'default';

        // Create shared files first
        this.createShared(answers);

        const themingFolder = themingMode.toLowerCase() === 'both' ? '' : `${themingMode.toLowerCase()}.`;
        const appStyle = CssStyleCompose.get(answers, themingMode, theme);

        writeFileSync(
            join(cssFolder, `${mainCssFileName}.css`),
            appStyle
        );

        writeFileSync(
            join(cssFolder, 'flexiwind/base.css'),
            StubStorage.get('css.flexiwind.base')
        );
        writeFileSync(
            join(cssFolder, 'flexiwind/form.css'),
            StubStorage.get('css.flexiwind.form')
        );
        writeFileSync(
            join(cssFolder, 'flexiwind/button.css'),
            StubStorage.get('css.flexiwind.button')
        );
        writeFileSync(
            join(cssFolder, 'flexiwind/ui.css'),
            StubStorage.get('css.flexiwind.ui')
        );
        writeFileSync(
            join(cssFolder, 'flexiwind/utils.css'),
            StubStorage.get('css.flexiwind.utils')
        );
        writeFileSync(
            join(cssFolder, 'button-styles.css'),
            StubStorage.get(`css.${themingFolder}buttons`)
        );

        writeFileSync(
            join(cssFolder, 'ui-utilities.css'),
            StubStorage.get(`css.${themingFolder}utilities`)
        );
    }

    private static generateConfigFiles(answers: ProjectAnswers): void {
        const truncate = answers.framework === 'next'

        const componentsJson = {
            "$schema": "https://ui.shadcn.com/schema.json",
            "style": "new-york",
            "rsc": truncate,
            "tsx": ProjectDetector.isTypeScript(),
            "tailwind": {
                "config": "",
                "css": join(answers.cssPath || (ProjectDetector.hasSrcDir() ? 'src/' : './'), `${this.getMainCssFileName()}.css`),
                "baseColor": "slate",
                "cssVariables": true,
                "prefix": ""
            },
            "iconLibrary": answers.iconLibrary,
            "themingMode": answers.themingMode,
            "aliases": {
                "components": "@/components",
                "utils": "@/lib/utils",
                "ui": "@/components/ui",
                "lib": "@/lib",
                "hooks": "@/hooks"
            },
            "registries": {
                "@flexaria": truncate ? NEXTJS_REGISTY_URL : REGISTY_URL
            }
        };


        writeFileSync('components.json', JSON.stringify(componentsJson, null, 2));
    }

    private static getMainCssFileName(): string {
        return "globals"
    }

    private static createFrameworkSpecificFiles(framework: string, answers: ProjectAnswers): void {
        switch (framework) {
            case 'astro':
                this.createAstroFiles();
                break;
            case 'rasengan':
                this.createRasenganFiles();
                break;
            case 'next':
                // this.createVueFiles(answers);
                break;
            case 'laravel-inertia':
                // this.createVueFiles(answers);
                break;
            case 'tanstack-start':
                // this.createSvelteFiles(answers);
                break;
            case 'react-js':
            case 'react-ts':
                this.createReactFiles(answers);
                break;
        }
    }

    private static createAstroFiles(): void {
        const hasSrc = ProjectDetector.hasSrcDir();
        const root = hasSrc ? 'src/' : '';

        if (!existsSync(join(root, "components"))) {
            mkdirSync(join(root, "components"), { recursive: true, mode: DIR_PERMISSIONS });
        }
        if (!existsSync(join(root, "components/seo"))) {
            mkdirSync(join(root, "components/seo"), { recursive: true, mode: DIR_PERMISSIONS });
        }

        if (!existsSync(join(root, "layouts"))) {
            mkdirSync(join(root, "layouts"), { recursive: true, mode: DIR_PERMISSIONS });
        }

        writeFileSync(
            'tsconfig.json',
            StubStorage.get("astro.tsconfig")
        );
        writeFileSync(
            join(root, 'layouts/Layout.astro'),
            StubStorage.get("astro.layout")
        );

        writeFileSync(
            join(root, 'components/seo/SEO.astro'),
            StubStorage.get("astro.seo")
        );
    }

    private static createRasenganFiles(): void {
        const hasSrc = ProjectDetector.hasSrcDir();
        const root = hasSrc ? 'src/' : '';
        if (!existsSync(join(root, "components"))) {
            mkdirSync(join(root, "components"), { recursive: true, mode: DIR_PERMISSIONS });
        }



        writeFileSync(`rasengan.config.js`, StubStorage.get('rasengan.config'));
    }


    private static createReactFiles(answers: ProjectAnswers): void {
        const endWith = ProjectDetector.isTypeScript() ? "ts" : "js"
        writeFileSync(`vite.config.${endWith}`, StubStorage.get('vite.vanilla'));
    }
}

