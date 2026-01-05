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
  .option(
    "--styles <framework>",
    "CSS framework to use (tailwind|unocss)",
    (val) => {
      if (!["tailwind", "unocss"].includes(val)) {
        throw new Error("Invalid CSS framework. Use tailwind or unocss.");
      }
      return val;
    }
  )

  .option("--js-path <path>", "Path to the JavaScript/TS entry file, Only For Vite Vanilla and Astro")
  .option("--css-path <path>", "Path to the CSS file, Only For Vite Vanilla and Astro")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const options: InitOptions = {
        styles: opts.styles,
        jsPath: opts.jsPath,
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
        initProjectFromCli,
        isNewProject,
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
