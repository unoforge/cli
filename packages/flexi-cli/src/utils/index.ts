import { DEFAULT_PATHS } from "@/core/const";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import {z} from "zod";

export function getDefaultPaths(framework: string) {
    return DEFAULT_PATHS.find((path) => path.framework === framework) || {
        framework,
        jsPath: "src/js/",
        cssPath: "src/css/"
    }
}

async function waitForPathExists(path: string, timeoutMs: number = 60000, intervalMs: number = 300, fileInside?: string): Promise<boolean> {
    const start = Date.now();
    const check = () => fileInside ? existsSync(join(path, fileInside)) : existsSync(path);
    // quick check first
    if (check()) return true;
    while (Date.now() - start < timeoutMs) {
        await new Promise((res) => setTimeout(res, intervalMs));
        if (check()) return true;
    }
    return check();
}

const displayName = () => {

}
const checkIsInitialize = (): boolean => {
    const configFilePath = join(process.cwd(), "flexi-cli.json")
    if (!existsSync(configFilePath)) {
        return false
    }

    try {
        const configContent = readFileSync(configFilePath, "utf-8")
        const config = JSON.parse(configContent)

        const requiredKeys = ['framework', 'defaultSource', 'registries']
        for (const key of requiredKeys) {
            if (!(key in config)) {
                return false
            }
        }

        if (!Array.isArray(config.registries)) {
            return false
        }

        if (config.registries.length === 0) {
            return false
        }

        return true

    } catch (error) {
        return false
    }
}


const normalizeFolderPath = (input: string): string => {
    if (!input) return input;
    // Replace backslashes, trim spaces
    let v = String(input).trim().replace(/\\/g, "/");
    // Remove leading ./
    v = v.replace(/^\.\//, "");
    // Collapse duplicate slashes
    v = v.replace(/\/+/, "/");
    // Ensure trailing slash
    if (!v.endsWith("/")) v += "/";
    return v;
}

const validateFolderPathZod = (value: string): true | string => {
    const isAbsolute = (v: string) => v.startsWith("/") || /^[A-Za-z]:[\\/]/.test(v);
    const schema = z.string()
        .min(1, "Path is required")
        .refine((v) => !isAbsolute(v), "Please provide a relative path (do not start with a drive letter or '/')")
        .refine((v) => !v.includes("../"), "Path cannot contain '..'")
        .regex(/^[A-Za-z0-9_\-\.\/]+$/, "Path contains invalid characters");

    const result = schema.safeParse(String(value ?? "").trim());
    return result.success ? true : result.error.issues[0]?.message || "Invalid path";
}


export { waitForPathExists, displayName, checkIsInitialize, normalizeFolderPath, validateFolderPathZod }
