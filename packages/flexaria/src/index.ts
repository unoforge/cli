#!/usr/bin/env node

import { Command } from "commander"
import { initCommand } from "./commands/init"
import { fixIconsCommand } from "./commands/fix-icons"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  // Read package.json properly
  const packageJsonPath = resolve(__dirname, "../package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

  const program = new Command()
    .name("j-rac")
    .description("A CLI tool for rapidly scaffolding ReactJS based applications using Flexiwind")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(initCommand)
  program.addCommand(fixIconsCommand)
  program.parse()
}

main()
