import { ListPackageManager } from "@/types";
import { existsSync } from "fs";
import path from "path";
import { execSync, spawn } from "child_process";
import { spinner } from "@/utils/spinner";

class PackageManager {
    private validManagers: ListPackageManager[] = ['npm', 'yarn', 'pnpm', 'bun'];
    private workingDir: string;

    constructor(
        private packageManager: ListPackageManager,
        workingDir: string = process.cwd(),
        private ui_spinner = spinner()
    ) {
        this.workingDir = workingDir;


        if (!this.validManagers.includes(this.packageManager)) {
            throw new Error(`Invalid package manager: ${this.packageManager}`);
        }
    }

    detectPackageManager = (cwd = process.cwd()): ListPackageManager => {
        if (existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
        if (existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
        if (existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
        return 'npm';
    }

    private ensurePackageJson(): void {
        if (!existsSync(path.join(this.workingDir, 'package.json'))) {
            throw new Error(`package.json not found in ${this.workingDir}`);
        }
    }

    changeDirectory(dir: string): void {
        // If absolute, use as-is. If relative, resolve from the PackageManager's current workingDir
        this.workingDir = path.isAbsolute(dir) ? dir : path.resolve(this.workingDir, dir);
    }

    runCommand(command: string, successMessage?: string, failMessage?: string, background: boolean = false): boolean {
        try {
            if (background) {
                this.ui_spinner.start(`Running command: ${command}`);
                const child = spawn(command, {
                    cwd: this.workingDir,
                    shell: true,
                    detached: true,
                    stdio: 'ignore',
                });
                child.unref();
                this.ui_spinner.succeed(successMessage ?? `Started: ${command}`);
                return true;
            } else {
                this.ui_spinner.start(`Running command: ${command}`);
                execSync(command, { cwd: this.workingDir, stdio: 'inherit' });
                this.ui_spinner.succeed(successMessage ?? `Command: ${command}`);
                return true;
            }
        } catch (error) {
            this.ui_spinner.fail(failMessage ?? `Failed to run command: ${command}`);
            return false;
        }
    }

    install(packageName: string, isDevDep: boolean = false, background: boolean = false): boolean {
        this.ensurePackageJson();
        return this.runCommand(this.buildInstallCommand(packageName, isDevDep), `Installed ${packageName}`, `Failed to install ${packageName}`, background);
    }

    remove(packageName: string): boolean {
        this.ensurePackageJson();
        return this.runCommand(this.buildRemoveCommand(packageName), `Removed ${packageName}`, `Failed to remove ${packageName}`);
    }

    isInstalled(packageName: string): boolean {
        this.ensurePackageJson();
        try {
            const output = execSync(`${this.packageManager} list --depth=0 --json`, {
                cwd: this.workingDir,
                stdio: 'pipe',
                encoding: 'utf8'
            });
            const data = JSON.parse(output);
            return !!data.dependencies?.[packageName];
        } catch (error) {
            return false;
        }
    }

    getInstalledPackages(): Record<string, any> {
        this.ensurePackageJson();
        try {
            const output = execSync(`${this.packageManager} list --depth=0 --json`, {
                cwd: this.workingDir,
                stdio: 'pipe',
                encoding: 'utf8'
            });
            const data = JSON.parse(output);
            return data.dependencies ?? {};
        } catch (error) {
            return {};
        }
    }

    getVersion(packageName: string): string | null {
        const packages = this.getInstalledPackages();
        return packages[packageName]?.version ?? null;
    }

    isAvailable(): boolean {
        try {
            execSync(`${this.packageManager} --version`, { stdio: 'ignore' });
            return true;
        } catch (error) {
            return false;
        }
    }

    buildInstallCommand(packageName: string, isDevDep: boolean): string {
        switch (this.packageManager) {
            case 'npm':
                return `npm install ${packageName}${isDevDep ? " -D" : ""}`;
            case 'yarn':
                return `yarn add ${packageName}${isDevDep ? " --dev" : ""}`;
            case 'pnpm':
                return `pnpm add ${packageName}${isDevDep ? " --save-dev" : " --save"}`;
            case 'bun':
                return `bun add ${packageName}${isDevDep ? " --development" : ""}`;
        }
    }

    private buildRemoveCommand(packageName: string): string {
        switch (this.packageManager) {
            case 'npm':
                return `npm uninstall ${packageName}`;
            case 'yarn':
                return `yarn remove ${packageName}`;
            case 'pnpm':
                return `pnpm remove ${packageName}`;
            case 'bun':
                return `bun remove ${packageName}`;
        }
    }
}

export { PackageManager };
