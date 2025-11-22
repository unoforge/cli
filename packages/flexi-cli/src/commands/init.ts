import { CliSetup } from "@/core/cli-setup";
import { ProjectCreator } from "@/core/creator";
import { PackageManager } from "@/core/package-manager";
import { ProjectDetector } from "@/core/project-detector";
import { ProjectInitializer } from "@/core/project-initializer";
import { CloneStarter } from "@/libs/clone-starter";
import { InitOptions } from "@/types";
import { checkIsInitialize, displayName, waitForPathExists } from "@/utils";
import { handleError } from "@/utils/handleError";
import { logger } from "@/utils/logger";
import { spinner } from "@/utils/spinner";
import { Command } from "commander";
import { join } from "node:path";


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
  .option(
    "--starter <starter>",
    "Starter template to use (astro|vite|vue|svelte)",
    (val) => {
      const allowed = ["astro", "vite", "vue", "svelte"];
      if (!allowed.includes(val)) {
        throw new Error(
          `Invalid starter template. Use one of: ${allowed.join(", ")}`
        );
      }
      return val;
    }
  )
  .option(
    "--new <framework>",
    "Target framework for the project (astro|vite|vite-ts|vue|vue-ts|svelte|svelte-ts)",
    (val) => {
      const allowed = ["astro", "vite", "vite-ts", "vue", "vue-ts", "svelte", "svelte-ts"];
      if (!allowed.includes(val)) {
        throw new Error(
          `Invalid target framework. Use one of: ${allowed.join(", ")}`
        );
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
        new: opts.new,
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

      if (initProjectFromCli && !projectAnswers) {
        process.exit(0);
      }

      if (projectAnswers?.useStarter && projectAnswers.starter) {
        // const cloneStarter = new CloneStarter();
        // await cloneStarter.clone(
        //   projectAnswers.starter,
        //   projectAnswers.projectName
        // );
        logger.info("No starter templates are available yet. Please try again later.");
        return process.exit(0);
      }

      // For non-starter new projects:
      if (isNewProject) {
        const detector = await ProjectDetector.askPackageManager();
        const creator = new ProjectCreator(projectAnswers.framework as any, detector);
        creator.create(projectAnswers.projectName);

        const cli = new CliSetup(projectAnswers.projectName, projectAnswers, projectAnswers.framework as any, detector)

        // Wait for the scaffolded project directory to exist before changing directory
        const targetDir = join(process.cwd(), projectAnswers.projectName);

        spin.start(`Creating project ${projectAnswers.projectName}, this may take a long time`)
        // const ready = await waitForPathExists(targetDir, 60_000, 300, 'package.json');
        // if (!ready) {
        //   logger.error(`Timed out waiting for project directory to be created: ${targetDir}`);
        //   spin.fail(`Failed to create directory: ${targetDir}`);
        //   return process.exit(1);
        // }


        try {
          process.chdir(targetDir);
          cli.setup(true);
          spin.succeed(`Project created successfully`);
          spin.stop()
        } catch (error) {
          logger.error(error);
          spin.fail(`Failed to create project directory: ${targetDir}`);
          return process.exit(1);
        }

        // cd to the create project
        return process.exit(0);
      }

      const pkgManager = PackageManager.detectPackageManager()


      const cli = new CliSetup(projectAnswers.projectName, projectAnswers, projectAnswers.framework as any, pkgManager)
      cli.setup(false)
      spin.succeed(`Project initialized successfully`)
      spin.stop()
    } catch (error) {
      handleError(error);
    }
  });

// Waits until a path exists on disk or until timeout is reached.
