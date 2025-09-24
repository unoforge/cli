
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { StubStorage } from './stub-storage';
import { ComposeUnoConfig } from '../helpers/compose-uno-config';
import { CssStyleCompose } from '../helpers/css-style-compose';
import { UnoUiCompose } from '../helpers/uno-ui-compose';
import { ProjectAnswers } from '../types';
import { DIR_PERMISSIONS } from './const';

export class FileGenerator {
    static generateBaseFiles(framework: string, answers: ProjectAnswers): void {
        const mainCssFileName = this.getMainCssFileName(framework);
        
        if (answers.cssFramework === 'tailwind') {
            this.createFlexiwindFiles(answers, mainCssFileName);
        } else {
            this.createUnoUiFiles(answers, mainCssFileName, framework);
        }
        
        this.createFrameworkSpecificFiles(framework, answers);
    }

    private static createShared(answers: ProjectAnswers): void {
        const jsFolder = answers.jsPath || 'src/js/';
        const cssFolder = answers.cssPath || 'src/css/';
        
        // Create directories if they don't exist
        if (!existsSync(jsFolder)) {
            mkdirSync(jsFolder, { recursive: true, mode: DIR_PERMISSIONS });
        }
        if (!existsSync(cssFolder)) {
            mkdirSync(cssFolder, { recursive: true, mode: DIR_PERMISSIONS });
        }

        writeFileSync(
            join(jsFolder, 'flexilla.js'),
            StubStorage.get('js.flexilla')
        );
    }

    private static createFlexiwindFiles(answers: ProjectAnswers, mainCssFileName: string): void {
        const cssFolder = answers.cssPath || 'src/';
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
            join(cssFolder, 'flexiwind.css'),
            StubStorage.get('css.flexiwind')
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

    private static createUnoUiFiles(answers: ProjectAnswers, mainCssFileName: string, framework: string): void {
        const cssFolder = answers.cssPath || 'src/';
        const themingMode = answers.themingMode || 'light';
        const theme = answers.theme || 'default';
        
        // Create shared files first
        this.createShared(answers);

        const postcssConfig = ComposeUnoConfig.getPostCSSConfig(framework);
        const unoConfig = ComposeUnoConfig.get(answers, themingMode, framework);
        const appStyle = UnoUiCompose.get(themingMode as "both" | "light" | "dark");
        const themeStyle = UnoUiCompose.getTheme(theme);

        writeFileSync('uno.config.js', unoConfig);
        
        writeFileSync(
            join(cssFolder, 'theme.css'),
            themeStyle
        );
        
        writeFileSync(
            join(cssFolder, `${mainCssFileName}.css`),
            appStyle
        );
    }

    private static getMainCssFileName(framework: string): string {
        switch (framework) {
            case 'astro':
            case 'vue':
            case 'nuxt':
            case 'svelte':
                return 'style';
            case 'vite':
            case 'vite-js':
            case 'vite-ts':
                return 'main';
            default:
                return 'style';
        }
    }

    private static createFrameworkSpecificFiles(framework: string, answers: ProjectAnswers): void {
        switch (framework) {
            case 'astro':
                this.createAstroFiles(answers);
                break;
            case 'vue':
                this.createVueFiles(answers);
                break;
            case 'nuxt':
                this.createNuxtFiles(answers);
                break;
            case 'svelte':
                this.createSvelteFiles(answers);
                break;
            case 'vite':
            case 'vite-js':
            case 'vite-ts':
                this.createViteFiles(answers);
                break;
        }
    }

    private static createAstroFiles(answers: ProjectAnswers): void {
        // Create Astro-specific configuration files
    
    }

    private static createVueFiles(answers: ProjectAnswers): void {
        // Create Vue-specific configuration files
       
    }

    private static createNuxtFiles(answers: ProjectAnswers): void {
        // Create Nuxt-specific configuration files
        
    }

    private static createSvelteFiles(answers: ProjectAnswers): void {
        // Create Svelte-specific configuration files
        
    }

    private static createViteFiles(answers: ProjectAnswers): void {
        // Create Vite-specific configuration files
       
    }
}

