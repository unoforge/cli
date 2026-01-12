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

    setup(noBaseNodeModules: boolean = false) {
        this.installDependencies(noBaseNodeModules);
        this.generateFiles(this.framework);
    }

    private installDependencies(noBaseNodeModules: boolean) {
        if (noBaseNodeModules) this.installer.baseInstallation()
        this.installer.installTailwindCSS();

        if (this.answers.framework === "vite" || this.answers.framework === "vite-ts") {
        //    do something here 
        }
        this.installer.installIconLibrary(this.answers.iconLibrary);
    }

    private generateFiles(framework: string) {
        FileGenerator.generateBaseFiles(framework, this.answers);
    }
}

export { CliSetup }
