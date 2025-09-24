import { Package_Manager, ProjectAnswers } from "@/types";
import { Installers } from "@/helpers/installers";
import { FileGenerator } from "./file-generator";

class CliSetup {
    private dir: string;
    constructor(
        dir: string,
        private answers: ProjectAnswers,
        private framework: string,
        private packageManager: Package_Manager,
        private installer = new Installers(dir, packageManager)
    ) {
        this.dir = dir;
    }

    setup() {
        this.installDependencies();
        this.generateFiles(this.framework);
    }

    private installDependencies() {
        
        this.installer.baseInstallation()
        if (this.answers.cssFramework === "tailwind") {
            this.installer.installTailwindCSS();
        } else {
            this.installer.installUno();
        }
        // this.installer.installIconLibrary(this.answers.iconLibrary);
    }

    private generateFiles(framework: string) {
        FileGenerator.generateBaseFiles(framework, this.answers);
    }
}

export { CliSetup }
