import { StubStorage } from "@/core/stub-storage";
import { UnoDark } from "./style/uno-dark";
import { UnoLight } from "./style/uno-light";
import { UnoBoth } from "./style/uno-both";

export class UnoUiCompose {
  static getTheme(theme: string): string {
    const colors = StubStorage.get(`themes.uno-3.${theme}`);
    return colors;
  }

  static get(themingMode: "both" | "light" | "dark"): string {
    const headStyle = "@import url(./theme.css); \n@import '@unocss/reset/tailwind.css'; \n";

    const baseStyle = `* {
  scrollbar-width: thin !important;
  scrollbar-color: transparent !important;
}
:root{
  --c-white: 0 0% 100%;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
::-webkit-scrollbar-track {
  background: transparent !important;
}
::-webkit-scrollbar-thumb {
  background-color: transparent !important;
  border-radius: 0 !important;
  border: none !important;
}`;

    const keyFrames = `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-1.5rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-0.75rem);
  }
}`;

    const darkOnly = UnoDark.get();
    const lightOnly = UnoLight.get();
    const both = UnoBoth.get();

    const style = themingMode.toLowerCase() === 'both'
      ? both
      : (themingMode.toLowerCase() === 'dark' ? darkOnly : lightOnly);

    const outputStyle = `${headStyle}\n\n\n\n${baseStyle}\n\n\n\n${style}\n\n${keyFrames}`;

    return outputStyle;
  }

}
