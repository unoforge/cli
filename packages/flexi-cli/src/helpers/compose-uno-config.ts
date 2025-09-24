import { ProjectAnswers } from "@/types";

export class ComposeUnoConfig {
    private static getContentConfig(framework: string = 'astro'): string {
        let paths: string[];

        switch (framework) {
            case 'astro':
                paths = [
                    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
                    './src/**/*.astro'
                ];
                break;
            case 'vue':
                paths = [
                    './src/**/*.{vue,js,ts,jsx,tsx}',
                    './src/**/*.vue'
                ];
                break;
            case 'nuxt':
                paths = [
                    './components/**/*.{vue,js,ts}',
                    './layouts/**/*.vue',
                    './pages/**/*.vue',
                    './plugins/**/*.{js,ts}',
                    './app.vue'
                ];
                break;
            case 'svelte':
                paths = [
                    './src/**/*.{html,js,svelte,ts}',
                    './src/**/*.svelte'
                ];
                break;
            case 'vite':
            case 'vite-js':
            case 'vite-ts':
                paths = [
                    './index.html',
                    './src/**/*.{js,ts,jsx,tsx,vue,svelte}'
                ];
                break;
            default:
                throw new Error(`Unsupported framework: ${framework}`);
        }

        return JSON.stringify(paths, null, 2);
    }

    static get(answers: ProjectAnswers, themingMode: string): string {
        const icon = answers.iconLibrary || 'ph';

        const configImport = `import { defineConfig, presetWind3, presetIcons } from "unocss";
import { flexillaPreset } from "@unifydev/flexilla";
import { presetUI } from "@unifydev/preset-ui";`;

        const importIcon = `import icons from "@iconify-json/${icon}";`;

        const appearance = themingMode === 'dark'
            ? 'appearance: "dark"'
            : (themingMode === 'light'
                ? 'appearance: "light"'
                : '');

        const config = `export default defineConfig({
    presets: [
        presetWind3({ dark: "class" }),
        presetIcons({
            collections: {
                // Use the \`icons\` object directly from '@iconify-json/${icon}'
                ${icon}: icons,
            },
        }),
        presetUI({
            ${appearance}
        }),
        flexillaPreset(),
    ],
});`;

        return `${configImport}\n${importIcon}\n\n${config}`;
    }

    static getPostCSSConfig(framework: string = 'astro'): string {
        const content = this.getContentConfig(framework);
        
        const postcssConfig = `import UnoCSS from '@unocss/postcss'

export default {
    plugins: [
        UnoCSS({
            content: ${content}
        }),
    ],
}`;

        return postcssConfig;
    }
}