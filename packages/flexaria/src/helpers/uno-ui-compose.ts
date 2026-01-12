import { StubStorage } from "@/core/stub-storage";

export class UnoUiCompose {
  static getTheme(theme: string): string {
    const colors = StubStorage.get(`themes.uno-3.${theme}`);
    return colors;
  }
}
