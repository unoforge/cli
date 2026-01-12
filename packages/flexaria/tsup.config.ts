import { defineConfig } from "tsup"

export default defineConfig({
    clean: true,
    dts: true,
    entry: [
        "src/index.ts"
    ],
    format: ["cjs"],
    platform: "node",
    sourcemap: true,
    minify: true,
    target: "node18",
    outDir: "dist",
    treeshake: true,
    splitting: false,
    shims: false,
    external: [
        "prompts",
        "commander",
        "chalk"
    ],
    outExtension: ({ format }) => ({
        js: format === "cjs" ? ".cjs" : ".js",
    }),

})
