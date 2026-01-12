import { Command } from "commander";
import { PackageManager } from "@/core/package-manager";
import { logger } from "@/utils/logger";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

export const uiCommand = new Command("ui")
  .description("Run shadcn-ui commands")
  .argument("[args...]", "shadcn-ui arguments")
  .allowUnknownOption()
  .action(async (args: string[]) => {
    try {
      if (!existsSync('components.json')) {
        logger.error("components.json not found. Please run 'j-rac init' first.");
        process.exit(1);
      }

      const pkgManager = PackageManager.detectPackageManager();
      const runner = pkgManager === 'npm' ? 'npx' : pkgManager === 'yarn' ? 'yarn dlx' : 'pnpm dlx';

      const command = `${runner} shadcn-ui@latest ${args.join(" ")}`;

      execSync(command, { stdio: "inherit" });

    } catch (error) {
      process.exit(1);
    }
  });
