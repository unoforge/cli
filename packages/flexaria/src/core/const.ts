export const REGISTY_URL = "http://localhost:3000/r/{name}.json";
export const NEXTJS_REGISTY_URL = "http://localhost:3000/next/{name}.json";


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
        title: "Hugeicons",
        value: "hugeicons",
        selected: true
    },
    {
        title: "Phosphore",
        value: "ph",
        selected: false
    }, {
        title: "Heroicons",
        value: "heroicons",
        selected: false
    }, {
        title: "Lucide",
        value: "lucide",
        selected: false
    }, 
]

export const DIR_PERMISSIONS = 0o755;


export const DEFAULT_PATHS = [
    {
        framework: "astro",
        cssPath: "src/assets/css/"
    },
    {
        framework: "react",
        cssPath: "src/"
    },
    {
        framework: "rasengan",
        cssPath: "src/"
    },
    {
        framework: "tanstack-start",
        cssPath: "app/"
    },
    {
        framework: "react-router",
        cssPath: "app/"
    },
    {
        framework: "inertia-react",
        cssPath: "resources/css/"
    }
]