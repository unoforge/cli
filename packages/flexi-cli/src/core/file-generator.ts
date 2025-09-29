
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { StubStorage } from './stub-storage';
import { ComposeUnoConfig } from '../helpers/compose-uno-config';
import { CssStyleCompose } from '../helpers/css-style-compose';
import { UnoUiCompose } from '../helpers/uno-ui-compose';
import { ProjectAnswers } from '../types';
import { DIR_PERMISSIONS } from './const';
import { logger } from '@/utils/logger';

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

        if (answers.framework.includes("vite") || answers.framework === "astro")
            if (answers.framework === "vite") {
                writeFileSync(
                    join(jsFolder, 'flexilla.js'),
                    StubStorage.get('js.flexilla')
                );
            } else {
                writeFileSync(
                    join(jsFolder, 'flexilla.ts'),
                    StubStorage.get('js.flexilla')
                );
            }
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

        // const postcssConfig = ComposeUnoConfig.getPostCSSConfig(framework);
        const unoConfig = ComposeUnoConfig.get(answers, themingMode);
        const appStyle = UnoUiCompose.get(themingMode as "both" | "light" | "dark");
        const themeStyle = UnoUiCompose.getTheme(theme);

        const endWith = answers.framework.endsWith("-ts") || answers.framework === "astro" ? "ts" : "js"
        writeFileSync(`uno.config.${endWith}`, unoConfig);

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
            case 'vue-ts':
            case 'svelte':
            case 'svelte-ts':
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
                this.createAstroFiles();
                break;
            case 'vue':
            case 'vue-ts':
                this.createVueFiles(answers);
                break;
            case 'svelte':
            case 'svelte-ts':
                this.createSvelteFiles(answers);
                break;
            case 'vite':
            case 'vite-js':
            case 'vite-ts':
                this.createViteFiles(answers);
                break;
        }
    }

    private static createAstroFiles(): void {
        if (!existsSync("src/components")) {
            mkdirSync("src/components", { recursive: true, mode: DIR_PERMISSIONS });
        }
        if (!existsSync("src/components/seo")) {
            mkdirSync("src/components/seo", { recursive: true, mode: DIR_PERMISSIONS });
        }

        if (!existsSync("src/layouts")) {
            mkdirSync("src/layouts", { recursive: true, mode: DIR_PERMISSIONS });
        }

        writeFileSync(
            'tsconfig.json',
            StubStorage.get("astro.tsconfig")
        );
        writeFileSync(
            'src/layouts/Layout.astro',
            StubStorage.get("astro.layout")
        );

        writeFileSync(
            'src/components/seo/SEO.astro',
            StubStorage.get("astro.seo")
        );
    }

    private static createVueFiles(answers: ProjectAnswers): void {
        logger.break()
        logger.info("🌟  Vue support is still under construction. Contributions are welcome! 🚀");
        logger.info("🚀  Check out the project on GitHub: https://github.com/unoforge/cli");
    }

    private static createSvelteFiles(answers: ProjectAnswers): void {
        // to do
        logger.break()
        logger.info("🌟  Svelte support is still under construction. Contributions are welcome! 🚀");
        logger.info("🚀  Check out the project on GitHub: https://github.com/unoforge/cli");

    }

    private static createViteFiles(answers: ProjectAnswers): void {
        const endWith = answers.framework.endsWith("-ts") ? "ts" : "js"
        writeFileSync(`vite.config.${endWith}`, StubStorage.get('vite.vanilla'));
    }
}

