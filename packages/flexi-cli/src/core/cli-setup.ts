import { Package_Manager, ProjectAnswers } from "@/types";
import { Installers } from "@/helpers/installers";
import { FileGenerator } from "./file-generator";

class CliSetup {
    
    constructor(
        dir: string,
        private answers: ProjectAnswers,
        private framework: string,
        packageManager: Package_Manager,
        private installer = new Installers(dir, packageManager)
    ) {

    }

    setup(isNew: boolean = false) {
        this.installDependencies(isNew);
        this.generateFiles(this.framework);
    }

    private installDependencies(isNew: boolean) {
        if (isNew) this.installer.baseInstallation()
        const isTailwind = this.answers.cssFramework === "tailwind"
        if (isTailwind) {
            this.installer.installTailwindCSS();
        } else {
            this.installer.installUno();
        }

        if (this.answers.framework === "vite" || this.answers.framework === "vite-ts") {
            this.installer.installViteGlob();
        }
        this.installer.installIconLibrary(this.answers.iconLibrary, isTailwind);
    }

    private generateFiles(framework: string) {
        FileGenerator.generateBaseFiles(framework, this.answers);
    }
}

export { CliSetup }
