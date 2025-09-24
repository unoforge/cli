export type ListPackageManager = 'pnpm' | 'yarn' | 'npm' | 'bun';
export type ThemingMode = "both"|"dark"|"light";

export type ProjectAnswers = {
    framework: string;
    cssFramework: "tailwind" | "unocss";
    theme: string;
    projectName: string;
    useStarter?: boolean;
    starter?: Starter;
    jsPath: string;
    cssPath: string;
    themingMode: ThemingMode;
    iconLibrary: string;
}

export type Package_Manager = 'npm' | 'yarn' | 'pnpm' | 'bun';



export type InitOptions = {
    styles?: "unocss" | "tailwind";
    new?: "astro" | "vite-ts" | "vite-js" | "vue" | "vue-ts" | "svelte" | "svelte-ts";
    jsPath?: string;
    cssPath?: string;
    cwd?: string
}

export type Starter = {
    name: string;
    title: string;
    description: string;
    framework: string;
    cssFramework: "tailwind" | "unocss";
    jsPath: string;
    cssPath: string;
    themingMode: ThemingMode;
    github: string;
}
