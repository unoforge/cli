import { PackageManager } from "@/core/package-manager";
import { Package_Manager } from "@/types";
import { spinner } from "@/utils/spinner";

class Installers {
    constructor(
        private dir: string,
        private packageManager: Package_Manager, private pkgManager = new PackageManager(packageManager), private spin = spinner()) {
    }
    baseInstallation() {
        this.pkgManager.changeDirectory(this.dir)
        const cmd = `${this.packageManager} install`
        try {
            this.spin.start("Installing dependencies...")
            this.pkgManager.runCommand(cmd, "Installed dependencies", "Installation failed", true)
            this.spin.stop()
        } catch (error) {
            this.spin.fail(`Failed to install dependencies, please run manually : ${cmd}`)
            process.exit(1)
        }
    }

    installTailwindCSSForNextJS() {
        
    }

    installTailwindCSS() {
        if (!this.pkgManager.isInstalled('tailwindcss')) {
            this.pkgManager.install('tailwindcss @tailwindcss/vite', true);
        } else if (!this.pkgManager.isInstalled('@tailwindcss/vite')) {
            this.pkgManager.install('@tailwindcss/vite', true);
        } else {
            console.log('TailwindCSS is already installed.');
        }
    }
    installIconLibrary(iconLibrary: string) {
        if (!this.pkgManager.isInstalled('@iconify/tailwind4')) {
            this.pkgManager.install('@iconify/tailwind4', true);
        }
        try {
            this.pkgManager.install(`@iconify-json/${iconLibrary}`, true, true);
        } catch (e) {
            console.log('Icon library is already installed.');
        }
    }
}

export { Installers }
