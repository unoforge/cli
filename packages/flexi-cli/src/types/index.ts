export type ListPackageManager = 'pnpm' | 'yarn' | 'npm' | 'bun';
export type ThemingMode = "both" | "dark" | "light";

export type ProjectAnswers = {
    framework: string;
    cssFramework: "tailwind" | "unocss";
    theme: string;
    projectName: string;
    jsPath: string;
    cssPath: string;
    themingMode: ThemingMode;
    iconLibrary: string;
}

export type Package_Manager = 'npm' | 'yarn' | 'pnpm' | 'bun';



export type InitOptions = {
    styles?: "unocss" | "tailwind";
    jsPath?: string;
    cssPath?: string;
    cwd?: string
}


