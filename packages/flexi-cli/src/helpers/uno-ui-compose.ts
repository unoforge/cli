import { StubStorage } from "@/core/stub-storage";

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

        const darkOnly = this.getDarkOnly();
        const lightOnly = this.getLightOnly();
        const both = this.getBoth();

        const style = themingMode.toLowerCase() === 'both' 
            ? both 
            : (themingMode.toLowerCase() === 'dark' ? darkOnly : lightOnly);

        const outputStyle = `${headStyle}\n\n\n\n${baseStyle}\n\n\n\n${style}\n\n${keyFrames}`;

        return outputStyle;
    }

    private static getDarkOnly(): string {
        return `:root {
  /* Background colors */
  --bg: var(--c-gray-950);
  --bg-subtle: var(--c-gray-900);
  --bg-surface: var(--c-gray-900);
  --bg-muted: var(--c-gray-800);
  --bg-surface-elevated: var(--c-gray-700);

  /* Foreground colors */
  --fg: var(--c-gray-300);
  --fg-title: var(--c-white);
  --fg-subtitle: var(--c-gray-200);
  --fg-muted: var(--c-gray-300);
  --fg-light: var(--c-gray-400);

  /* Border colors */
  --border: var(--c-gray-900);
  --border-light: var(--c-gray-800);
  --border-subtle: var(--c-gray-900);
  --border-strong: var(--c-gray-700);
  --border-emphasis: var(--c-gray-600);
  --input: hsl(var(--c-gray-800) / 0.6);

  --c-primary-DEFAULT: var(--c-primary-300);
  --c-secondary-DEFAULT: var(--c-secondary-300);
  --c-warning-DEFAULT: var(--c-warning-300);
  --c-accent-DEFAULT: var(--c-accent-300);
  --c-success-DEFAULT: var(--c-success-300);
  --c-danger-DEFAULT: var(--c-danger-300);

  --ui-input-focus-outline: var(--c-primary-500);
  --ui-input-invalid-outline: var(--c-danger-500);
  --ui-input-place-holder: var(--c-gray-500);
  --switch-thumb-primary: var(--c-primary-500);
  --switch-checked-thumb-primary: var(--primary-500);

  --ui-checkbox-border: var(--border-light);

  --switch-knob-dark: var(--c-gray-950);

  color-scheme: dark;
}`;
    }

    private static getLightOnly(): string {
        return `:root {
  --bg: var(--c-white);
  --bg-subtle: var(--c-gray-50);
  --bg-surface: var(--c-gray-100);
  --bg-muted: var(--c-gray-200);
  --bg-surface-elevated: var(--c-gray-300);

  --fg: var(--c-gray-700);
  --fg-muted: var(--c-gray-600);
  --fg-title: var(--c-gray-900);
  --fg-subtitle: var(--c-gray-800);

  --border: var(--c-gray-200);
  --border-subtle: var(--c-gray-50);
  --border-light: var(--c-gray-200);
  --border-strong: var(--c-gray-300);
  --border-emphasis: var(--c-gray-400);
  --input: hsl(var(--c-gray-200));

  --c-primary-DEFAULT: var(--c-primary-600);
  --c-secondary-DEFAULT: var(--c-secondary-600);
  --c-warning-DEFAULT: var(--c-warning-600);
  --c-accent-DEFAULT: var(--c-accent-600);
  --c-success-DEFAULT: var(--c-success-600);
  --c-danger-DEFAULT: var(--c-danger-600);

  --ui-input-focus-outline: var(--c-primary-600);
  --ui-input-invalid-outline: var(--c-danger-600);
  --ui-input-place-holder: var(--c-gray-500);
  --switch-thumb-primary: var(--c-primary-600);
  --switch-checked-thumb-primary: var(--primary-600);

  --range-thumb-bg-gray: var(--bg);
  --range-track-bg-gray: var(--c-gray-200);

  --switch-checked-thumb-primary: var(--primary-600);

  --switch-knob-white: var(--c-white);

  --switch-knob-dark: var(--c-white);
}`;
    }

    private static getBoth(): string {
        return `:root {
  --bg: var(--c-white);
  --bg-subtle: var(--c-gray-50);
  --bg-surface: var(--c-gray-100);
  --bg-muted: var(--c-gray-200);
  --bg-surface-elevated: var(--c-gray-300);

  --fg: var(--c-gray-700);
  --fg-muted: var(--c-gray-600);
  --fg-title: var(--c-gray-900);
  --fg-subtitle: var(--c-gray-800);

  --border: var(--c-gray-200);
  --border-subtle: var(--c-gray-50);
  --border-light: var(--c-gray-200);
  --border-strong: var(--c-gray-300);
  --border-emphasis: var(--c-gray-400);
  --input: hsl(var(--c-gray-200));

  --c-primary-DEFAULT: var(--c-primary-600);
  --c-secondary-DEFAULT: var(--c-secondary-600);
  --c-warning-DEFAULT: var(--c-warning-600);
  --c-accent-DEFAULT: var(--c-accent-600);
  --c-success-DEFAULT: var(--c-success-600);
  --c-danger-DEFAULT: var(--c-danger-600);

  --ui-input-focus-outline: var(--c-primary-600);
  --ui-input-invalid-outline: var(--c-danger-600);
  --ui-input-place-holder: var(--c-gray-500);
  --switch-thumb-primary: var(--c-primary-600);
  --switch-checked-thumb-primary: var(--primary-600);

  --range-thumb-bg-gray: var(--bg);
  --range-track-bg-gray: var(--c-gray-200);

  --switch-checked-thumb-primary: var(--primary-600);

  --switch-knob-white: var(--c-white);

  --switch-knob-dark: var(--c-white);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Background colors */
    --bg: var(--c-gray-950);
    --bg-subtle: var(--c-gray-900);
    --bg-surface: var(--c-gray-900);
    --bg-muted: var(--c-gray-800);
    --bg-surface-elevated: var(--c-gray-700);

    /* Foreground colors */
    --fg: var(--c-gray-300);
    --fg-title: var(--c-white);
    --fg-subtitle: var(--c-gray-200);
    --fg-muted: var(--c-gray-300);
    --fg-light: var(--c-gray-400);

    /* Border colors */
    --border: var(--c-gray-900);
    --border-light: var(--c-gray-800);
    --border-subtle: var(--c-gray-900);
    --border-strong: var(--c-gray-700);
    --border-emphasis: var(--c-gray-600);
    --input: hsl(var(--c-gray-800) / 0.6);

    --c-primary-DEFAULT: var(--c-primary-300);
    --c-secondary-DEFAULT: var(--c-secondary-300);
    --c-warning-DEFAULT: var(--c-warning-300);
    --c-accent-DEFAULT: var(--c-accent-300);
    --c-success-DEFAULT: var(--c-success-300);
    --c-danger-DEFAULT: var(--c-danger-300);

    --ui-input-focus-outline: var(--c-primary-500);
    --ui-input-invalid-outline: var(--c-danger-500);
    --ui-input-place-holder: var(--c-gray-500);
    --switch-thumb-primary: var(--c-primary-500);
    --switch-checked-thumb-primary: var(--primary-500);

    --ui-checkbox-border: var(--border-light);

    --switch-knob-dark: var(--c-gray-950);

    color-scheme: dark;
  }
}`;
    }
}
