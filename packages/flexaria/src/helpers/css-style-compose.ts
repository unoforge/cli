import { ICON_LIBRARIES } from "@/core/const";
import { StubStorage } from "@/core/stub-storage";
import { ProjectAnswers } from "@/types";
import { StyleWindDark } from "./style/dark";
import { StyleWindLight } from "./style/light";
import { StyleWindBoth } from "./style/both";

export class CssStyleCompose {

  static get(answers: ProjectAnswers, themingMode: string, theme: string): string {
    const colors = StubStorage.get(`themes.tailwind.${theme}`);
    const icon = ICON_LIBRARIES.find(item => item.value === answers.iconLibrary) || 'ph';

    const headStyle = "@import \"tailwindcss\";\n@reference \"./flexiwind/base.css\"\n@reference \"./flexiwind/form.css\";\n@reference \"./flexiwind/button.css\";\n@reference \"./flexiwind/ui.css\";\n@reference \"./flexiwind/utils.css\";;\n@reference \"./button-styles.css\";\n@reference \"./ui-utilities.css\";";

    const plugin = `@plugin \"@iconify/tailwind4\" {\n  prefixes: ${icon};\n  scale: 1.2;\n}\n`;

    const baseStyle = `* {
  scrollbar-width: thin !important;
  scrollbar-color: transparent !important;
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
}`

    const darkOnly = StyleWindDark.get()
    const lightOnly = StyleWindLight.get();
    const both = StyleWindBoth.get();

    const style = themingMode.toLowerCase() === 'both'
      ? both
      : (themingMode.toLowerCase() === 'dark' ? darkOnly : lightOnly);

    const outputStyle = `${headStyle}\n\n\n${plugin}\n\n${baseStyle}\n\n\n${style.root}\n\n${colors}\n\n${style.theme}\n\n${keyFrames}`;

    return outputStyle;
  }
}
