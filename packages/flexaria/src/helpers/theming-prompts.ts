import prompts from "prompts";
import { DEFAULT_PATHS, ICON_LIBRARIES, THEMES, THEMING_MODES } from "../core/const";
import { normalizeFolderPath, validateFolderPathZod } from "@/utils";
import { ProjectDetector } from "../core/project-detector";
import { existsSync } from "node:fs";
import { join } from "node:path";


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
            } as prompts.PromptObject,
        ];
    }
    async askFolders(framework: string) {
        const hasSrc = ProjectDetector.hasSrcDir();
        const isUsingAppDir = framework === 'next' && existsSync(join(process.cwd(), 'app'));
        const rawPaths = DEFAULT_PATHS.find(path => path.framework === framework) ?? {
            cssPath: isUsingAppDir ? "styles" : "src/styles",
        }

        const paths = {
            cssPath: hasSrc ? rawPaths.cssPath : (rawPaths.cssPath?.startsWith('src/') ? rawPaths.cssPath.replace('src/', '') : rawPaths.cssPath),
        }

        const response = await prompts([
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
            cssPath: response.cssPath
        }
    }
}

export { ThemingPrompts }