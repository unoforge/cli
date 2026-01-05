import { InitOptions, ProjectAnswers } from "@/types";
import { ProjectDetector } from "./project-detector";
import { logger } from "@/utils/logger";
import prompts from "prompts";
import { ThemingPrompts } from "../helpers/theming-prompts";




export class ProjectInitializer {
    private supportedFrameworks = ['astro', 'vue', 'nuxt', 'svelte', 'vite-js', 'vite-ts', 'rasengan', 'react'];

    constructor(
        private themingPrompts: ThemingPrompts = new ThemingPrompts()
    ) {
    }

    async initialize(options: InitOptions): Promise<{ projectAnswers: ProjectAnswers, initProjectFromCli: boolean, isNewProject: boolean }> {
        let projectAnswers: ProjectAnswers = {
            projectName: '',
            framework: "",
            cssFramework: "tailwind",
            theme: "",
            jsPath: "",
            cssPath: "",
            themingMode: "both",
            iconLibrary: ""
        };
        let initProjectFromCli = false;
        let isNewProject = false;

        if (options.cwd && options.cwd !== process.cwd()) {
            process.chdir(options.cwd);
        }


        // Check if it's a PHP project
        if (ProjectDetector.checkComposer(process.cwd())) {
            logger.warn('🐘 PHP project detected!');
            logger.info('Please use the PHP version of flexi-cli:');
            logger.info('composer global require unoforge/flexi-cli');
            process.exit(0);
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

            if (!this.supportedFrameworks.includes(detectedFramework)) {

                logger.error(`❌ Sorry, the CLI does not support the '${detectedFramework}' framework for the moment.`);
                logger.info('Supported frameworks: Astro, Vue, Svelte, Vite (JS/TS)');
                process.exit(0);
            }

            projectAnswers = await this.handleExistingProject(detectedFramework, options);
        }

        return { projectAnswers, initProjectFromCli, isNewProject };
    }





    private async handleExistingProject(framework: string, options: InitOptions): Promise<ProjectAnswers> {
        logger.info(`📦 Detected ${framework} project`);

        // Check CSS frameworks
        const hasTailwind = ProjectDetector.checkTailwindCSS();
        const hasUnoCSS = ProjectDetector.checkUnoCSS();

        let cssFramework: string;

        if (options.styles && ['unocss', 'tailwind'].includes(options.styles)) {
            cssFramework = options.styles;
        } else if (hasTailwind) {
            cssFramework = 'tailwind';
            logger.info('✅ Tailwind CSS detected');
        } else if (hasUnoCSS) {
            cssFramework = 'unocss';
            logger.info('✅ UnoCSS detected');
        } else {
            const response = await prompts({
                type: 'select',
                name: 'cssFramework',
                message: 'Which CSS framework would you like to use?',
                choices: [
                    { title: 'UnoCSS', value: 'unocss' },
                    { title: 'Tailwind CSS', value: 'tailwind', selected: true }
                ]
            });
            cssFramework = response.cssFramework;
        }

        const themeResponse = await prompts(this.themingPrompts.get());

        let jsPath = ''
        let cssPath = ''
        if (options.jsPath) {
            jsPath = options.jsPath
        }
        if (options.cssPath) {
            cssPath = options.cssPath
        }
        if (jsPath === '' || cssPath === '') {
            const paths = await this.themingPrompts.askFolders(framework);
            jsPath = paths.jsPath
            cssPath = paths.cssPath
        }

        return {
            projectName: '',
            framework,
            cssFramework: cssFramework as 'tailwind' | 'unocss',
            theme: themeResponse.theme,
            themingMode: themeResponse.themingMode,
            iconLibrary: themeResponse.iconLibrary,
            jsPath: jsPath,
            cssPath: cssPath
        };
    }
}
