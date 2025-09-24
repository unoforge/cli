import type { Package_Manager } from "@/types";
import { PackageManager } from "@/core/package-manager";

class ProjectCreator {

    constructor(
        private framework: "astro" | "vite" | "vite-ts" | "vue" | "vue-ts" | "svelte" | "svelte-ts",
        private packageManager: Package_Manager,
        private pakgManager = new PackageManager(packageManager)
    ) {
        // this.createProject(projectName, framework, packageManager);
    }

    create(projectName: string) {
        const isTs = this.framework.endsWith("-ts");
        const baseFramework = this.framework.replace("-ts", "") as "astro" | "vite" | "vue" | "svelte";
        
        switch (baseFramework) {
            case "astro":
                this.createAstro(projectName, this.packageManager);
                break;
            case "vite":
                this.createVite(projectName, isTs, this.packageManager);
                break;
            case "vue":
                this.createVue(projectName, isTs, this.packageManager);
                break;
            case "svelte":
                this.createSvelte(projectName, isTs, this.packageManager);
                break;
        }
    }


    private createAstro(projectName: string, packageManager: Package_Manager) {
        let command = "";
        switch (packageManager) {
            case "npm":
                command = `npm create astro@latest ${projectName} -- --template minimal --no-install -n`;
                break;
            case "yarn":
                command = `yarn create astro ${projectName} --template minimal --no-install -n`;
                break;
            case "pnpm":
                command = `pnpm create astro ${projectName} --template minimal --no-install -n`;
                break;
            case "bun":
                command = `bun create-astro ${projectName} --template minimal --no-install -n`;
                break;
        }

        const success = this.pakgManager.runCommand(command, `Scaffolded new Astro project: ${projectName}`, `Failed to scaffold Astro project using: ${command}`, true);

        if(!success){
            process.exit(1);
        }
    }

    private createVite(projectName: string, isTs: boolean, packageManager: Package_Manager) {

        let command = "";   
        const ts = isTs ? "-ts" : "";
        switch (packageManager) {
            case "npm":
                command = `npm create vite@latest ${projectName} -- --template vanilla${ts}`;
                break;
            case "yarn":
                command = `yarn create vite ${projectName} --template vanilla${ts}`;
                break;
            case "pnpm":
                command = `pnpm create vite ${projectName} --template vanilla${ts}`;
                break;
            case "bun":
                command = `bun create-vite ${projectName} --template vanilla${ts}`;
                break;
        }

        const success = this.pakgManager.runCommand(command, `Scaffolded new Vite project: ${projectName}`, `Failed to scaffold Vite project using: ${command}`);

        if(!success){
            process.exit(1);
        }
    }

    private createSvelte(projectName: string, isTs: boolean, packageManager: Package_Manager) {
        let command = "";
        const ts = isTs ? "-ts" : "";
        switch (packageManager) {
            case "npm":
                command = `npm create vite@latest ${projectName} -- --template svelte${ts}`;
                break;
            case "yarn":
                command = `yarn create vite ${projectName} --template svelte${ts}`;
                break;
            case "pnpm":
                command = `pnpm create vite ${projectName} --template svelte${ts}`;
                break;
            case "bun":
                command = `bun create-vite ${projectName} --template svelte${ts}`;
                break;
        }

        const success = this.pakgManager.runCommand(command, `Scaffolded new Svelte project: ${projectName}`, `Failed to scaffold Svelte project using: ${command}`);

        if(!success){
            process.exit(1);
        }
    }

    private createVue(projectName: string, isTs: boolean, packageManager: Package_Manager) {
        let command = "";
        const ts = isTs ? "-ts" : "";
        switch (packageManager) {
            case "npm":
                command = `npm create vite@latest ${projectName} -- --template vue${ts}`;
                break;
            case "yarn":
                command = `yarn create vite ${projectName} --template vue${ts}`;
                break;
            case "pnpm":
                command = `pnpm create vite ${projectName} --template vue${ts}`;
                break;
            case "bun":
                command = `bun create-vite ${projectName} --template vue${ts}`;
                break;
        }

        const success = this.pakgManager.runCommand(command, `Scaffolded new Vue project: ${projectName}`, `Failed to scaffold Vue project using: ${command}`);

        if(!success){
            process.exit(1);
        }
    }
}



export { ProjectCreator }