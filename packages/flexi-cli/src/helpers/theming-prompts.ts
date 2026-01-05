import prompts from "prompts";
import { DEFAULT_PATHS, ICON_LIBRARIES, THEMES, THEMING_MODES } from "../core/const";
import { normalizeFolderPath, validateFolderPathZod } from "@/utils";


class ThemingPrompts {

    get(): prompts.PromptObject[] {
        return [
            {
                type: 'select',
                name: 'theme',
                message: '🎨 Which theme would you like to use?',
                choices: THEMES.map(theme => ({
                    title: theme.title,
                    value: theme.value,
                    selected: theme.selected
                }))
            } as prompts.PromptObject,
            {
                type: 'select',
                name: 'themingMode',
                message: 'Your theming mode',
                choices: THEMING_MODES.map(theme => ({
                    title: theme.title,
                    value: theme.value,
                    selected: theme.selected
                }))
            } as prompts.PromptObject,
            {
                type: 'select',
                name: 'iconLibrary',
                message: '🎨 Which Icon Library would you like to use?',
                choices: ICON_LIBRARIES.map(theme => ({
                    title: theme.title,
                    value: theme.value,
                    selected: theme.selected
                }))
            } as prompts.PromptObject
        ];
    }
    async askFolders(framework: string) {
        const paths = DEFAULT_PATHS.find(path => path.framework === framework) ?? {
            cssPath: "src/css",
            jsPath: "src/js"
        }
        const skipJsPath = ['react', 'vue', 'nuxt', 'rasengan'].includes(framework);

        const response = await prompts([
            ...(!skipJsPath ? [{
                type: 'text',
                name: 'jsPath',
                message: 'Path to the JavaScript/TS entry file',
                initial: paths.jsPath,
                validate: (val: string) => validateFolderPathZod(val),
                format: (val: string) => normalizeFolderPath(val)
            } as prompts.PromptObject] : []),
            {
                type: 'text',
                name: 'cssPath',
                message: 'Path to the CSS file',
                initial: paths.cssPath,
                validate: (val: string) => validateFolderPathZod(val),
                format: (val: string) => normalizeFolderPath(val)
            } as prompts.PromptObject,
        ])
        return {
            jsPath: skipJsPath ? paths.jsPath : response.jsPath,
            cssPath: response.cssPath
        }
    }
}

export { ThemingPrompts }