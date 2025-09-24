export const THEMING_MODES = [
    {
        title: "Both",
        value: "both",
        selected: true
    },
    {
        title: "Light",
        value: "light",
        selected: false
    },
    {
        title: "Dark",
        value: "dark",
        selected: false
    },
]


export const THEMES = [
    {
        title: "Flexiwind",
        value: "flexiwind",
        selected: true
    }, {
        title: "Water",
        value: "water",
        selected: false
    }, {
        title: "Earth",
        value: "earth",
        selected: false
    }, {
        title: "Fire",
        value: "fire",
        selected: false
    }, {
        title: "Air",
        value: "air",
        selected: false
    }
]

export const ICON_LIBRARIES = [
    {
        title:"Phosphore",
        value:"ph",
        selected:true
    },    {
        title:"Heroicons",
        value:"heroicons",
        selected:false
    },    {
        title:"Lucide",
        value:"lucide",
        selected:false
    },    {
        title:"Hugeicons",
        value:"hugeicons",
        selected:false
    },
]

export const DIR_PERMISSIONS = 0o755;


export const DEFAULT_PATHS = [
    {
        framework:"astro",
        jsPath:"src/js/",
        cssPath:"src/css/"
    },
    {
        framework:"vite-js",
        jsPath:"src/js/",
        cssPath:"src/css/"
    },
    {
        framework:"vite-ts",
        jsPath:"src/js/",
        cssPath:"src/css/"
    },
    {
        framework:"vue",
        jsPath:"src/js/",
        cssPath:"src/css/"
    },
    {
        framework:"vue-ts",
        jsPath:"src/js/",
        cssPath:"src/css/"
    },
    {
        framework:"svelte",
        jsPath:"src/js/",
        cssPath:"src/css/"
    },
    {
        framework:"svelte-ts",
        jsPath:"src/js/",
        cssPath:"src/css/"
    }
]