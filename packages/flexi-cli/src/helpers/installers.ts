import { ICON_LIBRARIES } from "@/core/const";
import { PackageManager } from "@/core/package-manager";
import { Package_Manager } from "@/types";
import { spinner } from "@/utils/spinner";

class Installers {
    constructor(
        private dir: string,
        private packageManager: Package_Manager, private pkgManager = new PackageManager(packageManager), private spin = spinner()) {

    }
    baseInstallation() {
        console.log(this.dir + "\n")
        console.log(process.cwd() + "\n")
        console.log("Hello")
        this.pkgManager.changeDirectory(this.dir)

        console.log(process.cwd() + "\n")
        console.log("Hello now")
        this.spin.start("Installing dependencies...")
        this.pkgManager.install(this.packageManager)
        this.spin.stop()
    }
    installUno() {
        if (!this.pkgManager.isInstalled('unocss')) {
            if (this.pkgManager.isInstalled('tailwindcss')) {
                this.pkgManager.remove('tailwindcss @tailwindcss/vite');
            }
        }
        this.pkgManager.install('unocss@latest @unifydev/preset-ui @unifydev/flexilla', true);
    }

    installTailwindCSS() {
        if (!this.pkgManager.isInstalled('tailwindcss')) {
            this.pkgManager.install('tailwindcss @tailwindcss/vite');
        } else if (!this.pkgManager.isInstalled('@tailwindcss/vite')) {
            this.pkgManager.install('@tailwindcss/vite');
        } else {
            console.log('TailwindCSS is already installed.');
        }
    }
    installIconLibrary(iconLibrary: string, isTailwind: boolean = false) {
        if (isTailwind && !this.pkgManager.isInstalled('@iconify/tailwind4')) {
            this.pkgManager.install('@iconify/tailwind4', true);
        }
        try {
            this.pkgManager.install(`@iconify-json/${iconLibrary}`, true);
        } catch (e) {
            console.log('Icon library is already installed.');
        }
    }
}

export { Installers }