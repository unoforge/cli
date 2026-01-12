export type ListPackageManager = 'pnpm' | 'yarn' | 'npm' | 'bun';
export type ThemingMode = "both" | "dark" | "light";

export type ProjectAnswers = {
    framework: string;
    theme: string;
    projectName: string;
    cssPath: string;
    themingMode: ThemingMode;
    iconLibrary: string;
}

export type Package_Manager = 'npm' | 'yarn' | 'pnpm' | 'bun';



export type InitOptions = {
    cssPath?: string;
    cwd?: string
}


