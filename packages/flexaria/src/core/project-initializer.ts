import { InitOptions, ProjectAnswers } from "@/types";
import { ProjectDetector } from "./project-detector";
import { logger } from "@/utils/logger";
import prompts from "prompts";
import { ThemingPrompts } from "../helpers/theming-prompts";




export class ProjectInitializer {
    private supportedFrameworks = ['astro', 'rasengan', 'react', 'vite-react', 'vite-react-ts', 'tanstack-start', 'react-router', 'inertia-react'];

    constructor(
        private themingPrompts: ThemingPrompts = new ThemingPrompts()
    ) {
    }

    async initialize(options: InitOptions): Promise<{ projectAnswers: ProjectAnswers }> {
        let projectAnswers: ProjectAnswers = {
            projectName: ProjectDetector.getProjectName(),
            framework: "",
            theme: "",
            cssPath: "",
            themingMode: "both",
            iconLibrary: ""
        };

        if (options.cwd && options.cwd !== process.cwd()) {
            process.chdir(options.cwd);
        }

        // Check if package.json exists
        if (!ProjectDetector.hasPackageJson(process.cwd())) {
            logger.error('✘ No package.json found.');
            logger.info('Please create a project first using your framework\'s CLI.');
            logger.info('Example: npm create astro@latest or npm create vite@latest');
            process.exit(0);
        } else {
            // Handle existing projects
            const detectedFramework = ProjectDetector.detect();

            if (!this.supportedFrameworks.includes(detectedFramework) && !['vite-js', 'vite-ts'].includes(detectedFramework)) {

                logger.error(`❌ Sorry, the CLI does not support the '${detectedFramework}' framework for the moment.`);
                logger.info('Supported frameworks: Astro, React, Rasengan, Tanstack Start, React Router 7, Inertia React');
                process.exit(0);
            }

            const framework = detectedFramework === 'vite-js' ? 'react' : detectedFramework === 'vite-ts' ? 'react' : detectedFramework;

            projectAnswers = await this.handleInitInProject(framework, options);
        }

        return { projectAnswers };
    }





    private async handleInitInProject(framework: string, options: InitOptions): Promise<ProjectAnswers> {
        logger.info(`📦 Detected ${framework} project`);

        // Check CSS frameworks
        const hasTailwind = ProjectDetector.checkTailwindCSS();

        if (!hasTailwind) {
            logger.info('ℹ️ Tailwind CSS will be configured for your project');
        }

        const themeResponse = await prompts(this.themingPrompts.get());

        let cssPath = ''

        if (options.cssPath) {
            cssPath = options.cssPath
        }
        if (cssPath === '') {
            const paths = await this.themingPrompts.askFolders(framework);
            cssPath = paths.cssPath
        }

        return {
            projectName: ProjectDetector.getProjectName(),
            framework,
            theme: themeResponse.theme,
            themingMode: themeResponse.themingMode,
            iconLibrary: themeResponse.iconLibrary,
            cssPath: cssPath
        };
    }
}
