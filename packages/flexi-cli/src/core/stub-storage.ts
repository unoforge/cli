import { readFileSync, existsSync } from "fs";
import { join } from "path";

export class StubStorage {
    private static basePath = join(__dirname, '../stubs');

    static get(key: string): string {
        const path = key.replace(/\./g, '/') + '.stub';
        const file = join(this.basePath, path);

        if (!existsSync(file)) {
            throw new Error(`Stub not found: ${file}`);
        }

        return readFileSync(file, 'utf-8');
    }
}