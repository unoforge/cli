import prompts from "prompts";
import { z } from "zod";
import { ICON_LIBRARIES, THEMES, THEMING_MODES } from "./const";


class ThemingPrompts {
    private normalizeFolderPath(input: string): string {
        if (!input) return input;
        // Replace backslashes, trim spaces
        let v = String(input).trim().replace(/\\/g, "/");
        // Remove leading ./
        v = v.replace(/^\.\//, "");
        // Collapse duplicate slashes
        v = v.replace(/\/+/, "/");
        // Ensure trailing slash
        if (!v.endsWith("/")) v += "/";
        return v;
    }

    private validateFolderPathZod(value: string): true | string {
        const isAbsolute = (v: string) => v.startsWith("/") || /^[A-Za-z]:[\\/]/.test(v);
        const schema = z.string()
            .min(1, "Path is required")
            .refine((v) => !isAbsolute(v), "Please provide a relative path (do not start with a drive letter or '/')")
            .refine((v) => !v.includes("../"), "Path cannot contain '..'")
            .regex(/^[A-Za-z0-9_\-\.\/]+$/, "Path contains invalid characters");

        const result = schema.safeParse(String(value ?? "").trim());
        return result.success ? true : result.error.issues[0]?.message || "Invalid path";
    }
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
    async askFolders(){
        const response = await prompts([
            {
                type: 'text',
                name: 'jsPath',
                message: 'Path to the JavaScript/TS entry file',
                initial: 'src/js/',
                validate: (val: string) => this.validateFolderPathZod(val),
                format: (val: string) => this.normalizeFolderPath(val)
            } as prompts.PromptObject,
            {
                type: 'text',
                name: 'cssPath',
                message: 'Path to the CSS file',
                initial: 'src/css/',
                validate: (val: string) => this.validateFolderPathZod(val),
                format: (val: string) => this.normalizeFolderPath(val)
            } as prompts.PromptObject,
        ])
        return response
    }
}

export { ThemingPrompts }