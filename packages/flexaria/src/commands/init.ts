import { CliSetup } from "@/core/cli-setup";
import { PackageManager } from "@/core/package-manager";
import { ProjectInitializer } from "@/core/project-initializer";
import { InitOptions } from "@/types";
import { checkIsInitialize, displayName } from "@/utils";
import { handleError } from "@/utils/handleError";
import { logger } from "@/utils/logger";
import { spinner } from "@/utils/spinner";
import { Command } from "commander";


export const initCommand = new Command("init")
  .description("Initialize a new project or configure an existing one")

  .option("--css-path <path>", "Path to the CSS file, Only For Vite Vanilla and Astro")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const options: InitOptions = {
        cssPath: opts.cssPath,
        cwd: opts.cwd,
      };

      if (checkIsInitialize()) {
        logger.info("Project already initialized");
        return;
      }

      displayName()



      const projectInitializer = new ProjectInitializer();
      const spin = spinner()


      const {
        projectAnswers,
      } = await projectInitializer.initialize(options);

      const pkgManager = PackageManager.detectPackageManager()


      const cli = new CliSetup(projectAnswers.projectName, projectAnswers, projectAnswers.framework as any, pkgManager)
      cli.setup(false)
      spin.succeed(`Project setup successfully`)
      spin.stop()
    } catch (error) {
      handleError(error);
    }
  });
