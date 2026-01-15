import { existsSync, readFileSync, readdirSync, writeFileSync, statSync } from "fs";
import { join, extname } from "path";
import { Command } from "commander";
import prompts from "prompts";
import { logger } from "@/utils/logger";
import { handleError } from "@/utils/handleError";
import { ICON_MAP } from "@/core/icons";
import { spinner } from "@/utils/spinner";
import { ProjectDetector } from "@/core/project-detector";

export const fixIconsCommand = new Command("fix-icons")
    .description("Scan components and replace Phosphor icons with the selected icon library")
    .action(async () => {
        try {
            const cwd = process.cwd();
            const componentsJsonPath = join(cwd, "components.json");

            if (!existsSync(componentsJsonPath)) {
                logger.error("✘ No components.json found. Please initialize the project first.");
                return;
            }

            const componentsJson = JSON.parse(readFileSync(componentsJsonPath, "utf-8"));
            const iconLibrary = componentsJson.iconLibrary;

            if (!iconLibrary) {
                logger.error("✘ No icon library specified in components.json.");
                return;
            }

            if (iconLibrary === "ph") {
                logger.info("ℹ Your project is already using Phosphor icons. No changes needed.");
                return;
            }

            const framework = ProjectDetector.detect();
            let componentsDir = "";

            if (framework === "inertia-react" || framework === "laravel") {
                componentsDir = join(cwd, "resources", "js", "components", "ui");
            } else {
                const hasSrc = ProjectDetector.hasSrcDir();
                if (hasSrc) {
                    componentsDir = join(cwd, "src", "components", "ui");
                } else {
                    componentsDir = join(cwd, "components", "ui");
                }
            }

            if (!existsSync(componentsDir)) {
                logger.warn(`⚠ components/ui directory not found at: ${componentsDir}`);
                return;
            }

            logger.info(`🔍 Scanning ${componentsDir} for icons to replace with ${iconLibrary}...`);

            const files = getAllFiles(componentsDir);
            let totalIconsFound = 0;
            const filesWithIcons: { path: string; content: string; replacements: { from: string; to: string }[] }[] = [];

            for (const filePath of files) {
                const content = readFileSync(filePath, "utf-8");
                const replacements: { from: string; to: string }[] = [];

                // Find all ph--[name] occurrences
                const regex = /ph--([a-z0-9-]+)/g;
                let match;
                while ((match = regex.exec(content)) !== null) {
                    const phIcon = match[0];
                    const iconName = match[1];

                    const mapping = ICON_MAP.find(m => m.ph === phIcon);
                    if (mapping && mapping[iconLibrary as keyof typeof mapping]) {
                        replacements.push({
                            from: phIcon,
                            to: mapping[iconLibrary as keyof typeof mapping] as string
                        });
                    }
                }

                if (replacements.length > 0) {
                    totalIconsFound += replacements.length;
                    filesWithIcons.push({ path: filePath, content, replacements });
                }
            }

            if (totalIconsFound === 0) {
                logger.info("✨ No Phosphor icons were found in your components.");
                return;
            }

            const confirm = await prompts({
                type: "confirm",
                name: "value",
                message: `Found ${totalIconsFound} icons in ${filesWithIcons.length} files. Do you want to replace them with ${iconLibrary} icons?`,
                initial: true
            });

            if (!confirm.value) {
                logger.info("Operation cancelled.");
                return;
            }

            const s = spinner();
            s.start("Replacing icons...");

            for (const fileData of filesWithIcons) {
                let newContent = fileData.content;
                for (const replacement of fileData.replacements) {
                    newContent = newContent.replace(new RegExp(replacement.from, "g"), replacement.to);
                }
                writeFileSync(fileData.path, newContent);
            }

            s.succeed(`Successfully replaced ${totalIconsFound} icons in ${filesWithIcons.length} files.`);
        } catch (error) {
            handleError(error);
        }
    });

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = join(dirPath, file);
        if (statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            const ext = extname(filePath);
            // Only target React-related files, skip Vue as requested
            if ([".tsx", ".jsx", ".ts", ".js", ".astro"].includes(ext)) {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
}
