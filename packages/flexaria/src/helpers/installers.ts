import { PackageManager } from "@/core/package-manager";
import { Package_Manager } from "@/types";
import { spinner } from "@/utils/spinner";

class Installers {
    constructor(
        private dir: string,
        private packageManager: Package_Manager, private pkgManager = new PackageManager(packageManager), private spin = spinner()) {
    }
    baseInstallation() {
        //tw-animate-css
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
        // For Next.js, we do not use @tailwindcss/vite. Install standard PostCSS toolchain.
        if (!this.pkgManager.isInstalled('tailwindcss')) {
            this.pkgManager.install('tailwindcss postcss autoprefixer', true);
        } else {
            // Ensure postcss and autoprefixer exist as well
            if (!this.pkgManager.isInstalled('postcss')) {
                this.pkgManager.install('postcss', true);
            }
            if (!this.pkgManager.isInstalled('autoprefixer')) {
                this.pkgManager.install('autoprefixer', true);
            }
        }
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

    installShadcnCli() {
        // Install shadcn CLI locally so users can run with package manager dlx or npx
        if (!this.pkgManager.isInstalled('shadcn')) {
            this.pkgManager.install('shadcn', true, true);
        }
    }
}

export { Installers }