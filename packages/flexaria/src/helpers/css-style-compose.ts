import { ICON_LIBRARIES } from "@/core/const";
import { StubStorage } from "@/core/stub-storage";
import { ProjectAnswers } from "@/types";
import { StyleWindDark } from "./style/dark";
import { StyleWindLight } from "./style/light";
import { StyleWindBoth } from "./style/both";

export class CssStyleCompose {

  static get(answers: ProjectAnswers, themingMode: string, theme: string): string {
    const colors = StubStorage.get(`themes.${theme.toLowerCase()}`);
    const scrollBaseConfig = StubStorage.get('css.scroll-config');
    const icon = ICON_LIBRARIES.find(item => item.value === answers.iconLibrary) || 'ph';

    const headStyle = `
@import "tailwindcss";
@import "tw-animate-css";

@reference "./flexiwind/base.css";
@reference "./flexiwind/form.css";
@reference "./flexiwind/button.css";
@reference "./flexiwind/ui.css";
@reference "./flexiwind/utils.css";
@reference "./flexiwind/grid-bg.css";

@reference "./button-styles.css";
@reference "./utilities.css";`;

    const plugin = `@plugin \"@iconify/tailwind4\" {\n  prefixes: ${icon};\n  scale: 1.0;\n}\n`;


    const darkOnly = StyleWindDark.get()
    const lightOnly = StyleWindLight.get();
    const both = StyleWindBoth.get();

    const style = themingMode.toLowerCase() === 'both'
      ? both
      : (themingMode.toLowerCase() === 'dark' ? darkOnly : lightOnly);

    const outputStyle = `${headStyle}\n\n\n${plugin}\n\n\n${style.root}\n\n${colors}\n\n${style.theme}\n\n${scrollBaseConfig}`;

    return outputStyle;
  }
}
