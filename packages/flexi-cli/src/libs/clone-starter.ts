import { Starter } from "@/types";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { logger } from "@/utils/logger";
import { spinner } from "@/utils/spinner";

class CloneStarter {
    async clone(starter: Starter, projectName: string): Promise<boolean> {
        try {
            const targetPath = join(process.cwd(), projectName);

            // Check if directory already exists
            if (existsSync(targetPath)) {
                logger.error(`❌ Directory '${projectName}' already exists`);
                return false;
            }

            const spin = spinner();
            spin.start("Cloning ${starter.title}...");
            // Clone the repository
            execSync(`git clone ${starter.github} "${targetPath}"`, {
                stdio: 'inherit'
            });

            // Remove .git directory to start fresh
            execSync(`rm -rf "${join(targetPath, '.git')}"`, {
                stdio: 'ignore'
            });
            spin.succeed(`✅ Successfully cloned ${starter.title} to ${projectName}`)
            spin.stop()
            return true;

        } catch (error) {
            logger.error(`❌ Failed to clone starter: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return false;
        }
    }
}

export { CloneStarter };
