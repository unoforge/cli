import prompts from "prompts";


class Starters {
    private starters = [
        {
            name: "astro-uno",
            title: "Astro + UnoCSS",
            description: "A starter template for Astro with UnoCSS",
            framework: "astro",
            cssFramework: "unocss",
            github: "https://github.com/unoforge/astro-uno",
            jsPath: "src/js",
            cssPath: "src/css",
            themingMode: "both",
            iconLibrary: "ph"
        },
        {
            name: "astro-tailwind",
            title: "Astro + Tailwind",
            description: "A starter template for Astro with Tailwind",
            framework: "astro",
            cssFramework: "tailwind",
            github: "https://github.com/unoforge/astro-tailwind",
            jsPath: "src/js",
            cssPath: "src/css",
            themingMode: "both",
            iconLibrary: "ph"
        },
        {
            name: "vite-uno",
            title: "Vite + UnoCSS",
            description: "A starter template for Vite with UnoCSS",
            framework: "vite",
            cssFramework: "unocss",
            github: "https://github.com/unoforge/vite-uno",
            jsPath: "src/js",
            cssPath: "src/css",
            themingMode: "both",
            iconLibrary: "ph"
        },
        {
            name: "vite-tailwind",
            title: "Vite + Tailwind",
            description: "A starter template for Vite with Tailwind",
            framework: "vite",
            cssFramework: "tailwind",
            github: "https://github.com/unoforge/vite-tailwind",
            jsPath: "src/js",
            cssPath: "src/css",
            themingMode: "both",
            iconLibrary: "ph"
        }
    ]


    getStarters() {
        return this.starters;
    }
    getStarter(name: string) {
        return this.starters.find(starter => starter.name === name);
    }
    async promptForStarter() {
        const starterName = await prompts({
            type: 'select',
            name: 'starter',
            message: 'Which starter would you like to use?',
            choices: this.starters.map(starter => ({
                title: starter.title,
                value: starter.name,
                selected: starter.name === 'astro-tailwind'
            }))
        });

        return this.getStarter(starterName.starter);
    }
}


export { Starters }