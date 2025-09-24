import { InitOptions, ProjectAnswers, Starter } from "@/types";
import { ProjectDetector } from "./project-detector";
import { logger } from "@/utils/logger";
import prompts from "prompts";
import { Starters } from "@/libs/starters";
import { ThemingPrompts } from "./theming-prompts";
import { existsSync } from "node:fs";
import { join } from "node:path";



export class ProjectInitializer {
    private supportedFrameworks = ['astro', 'vue', 'nuxt', 'svelte', 'vite-js', 'vite-ts'];

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

        if (options.new) {
            const newProject = await this.createNewProject(options.new, options);
            return { projectAnswers: newProject, initProjectFromCli: true, isNewProject: true };
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

            const starterResponse = await prompts({
                type: 'confirm',
                name: 'useStarter',
                message: 'Would you like to use a starter template?',
                initial: true
            });

            if (starterResponse.useStarter) {
                const projectNameResponse = await this.promptProjectName();
                const starter = (await new Starters().promptForStarter()) as Starter;
                projectAnswers = {
                    framework: starter.framework,
                    cssFramework: starter.cssFramework,
                    projectName: projectNameResponse.projectName,
                    useStarter: true,
                    theme: "default",
                    starter,
                    jsPath: starter.jsPath,
                    cssPath: starter.cssPath,
                    themingMode: "both",
                    iconLibrary: "ph"
                }
                initProjectFromCli = true
            } else {
                const response = await prompts({
                    type: 'select',
                    name: 'framework',
                    message: 'What framework would you like to use?',
                    choices: [
                        { title: 'Astro', value: 'astro' },
                        { title: 'Vue.js', value: 'vue' },
                        { title: 'Vue.js (TS)', value: 'vue-ts' },
                        { title: 'Svelte', value: 'svelte' }, 
                        { title: 'Svelte (TS)', value: 'svelte-ts' },
                        { title: 'Vite Vanilla', value: 'vite-js', selected: true },
                        { title: 'Vite Vanilla (TS)', value: 'vite-ts' }
                    ]
                });

                if (!response.framework) {
                    process.exit(0);
                }

                projectAnswers = await this.createNewProject(response.framework, options);
                initProjectFromCli = true;
                isNewProject = true;
            }


        } else {
            // Handle existing projects
            const detectedFramework = ProjectDetector.detect();

            if (!this.supportedFrameworks.includes(detectedFramework)) {
                logger.error(`❌ Sorry, the CLI does not support the '${detectedFramework}' framework for the moment.`);
                logger.info('Supported frameworks: Astro, Vue, Nuxt, Svelte, Vite (JS/TS)');
                process.exit(0);
            }

            projectAnswers = await this.handleExistingProject(detectedFramework, options);
        }

        return { projectAnswers, initProjectFromCli, isNewProject };
    }



    private async promptProjectName() {
        while (true) {
            const res = await prompts({
                type: 'text',
                name: 'projectName',
                message: 'What is your project name?',
                validate: (value: string) => value.length > 0 || 'Project name is required'
            });

            const name = String(res.projectName || '').trim();
            if (!name) {
                // validate will handle, but just in case
                continue;
            }

            const targetPath = join(process.cwd(), name);
            if (existsSync(targetPath)) {
                logger.error(`❌ Directory '${name}' already exists. Please choose a different project name.`);
                continue;
            }

            return { projectName: name };
        }
    }

    private async createNewProject(framework: string, options: InitOptions): Promise<ProjectAnswers> {
        const projectNameResponse = await this.promptProjectName();

        const additionalQuestions = [];

        // Only ask for CSS framework if not provided via --styles
        if (!options.styles || !['unocss', 'tailwind'].includes(options.styles)) {
            additionalQuestions.push({
                type: 'select',
                name: 'cssFramework',
                message: 'Which CSS framework would you like to use?',
                choices: [
                    { title: 'UnoCSS', value: 'unocss' },
                    { title: 'Tailwind CSS', value: 'tailwind' }
                ]
            });
        }

        additionalQuestions.push(...this.themingPrompts.get());

        const additionalResponses = await prompts(additionalQuestions as any);

        let jsPath = ''
        let cssPath = ''
        if (options.jsPath) {
            jsPath = options.jsPath
        }
        if (options.cssPath) {
            cssPath = options.cssPath
        }
        if (jsPath === '' || cssPath === '') {
            const paths = await this.themingPrompts.askFolders();
            jsPath = paths.jsPath
            cssPath = paths.cssPath
        }
        return {
            framework,
            projectName: projectNameResponse.projectName,
            useStarter: false,
            cssFramework: options.styles || additionalResponses.cssFramework,
            theme: additionalResponses.theme,
            themingMode: additionalResponses.themingMode,
            iconLibrary: additionalResponses.iconLibrary,
            ...additionalResponses,
            jsPath: jsPath,
            cssPath: cssPath
        };
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
            const paths = await this.themingPrompts.askFolders();
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
