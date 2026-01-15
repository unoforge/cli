export class StyleWindDark {
    static get() {
        const root = `:root {
  --ui-input-focus-outline: var(--color-primary-500);
  --focus-ring: var(--color-primary-600);
  --ui-input-place-holder: var(--color-gray-500);
  --ui-input-invalid-outline: var(--color-danger-500);
  --ring-offset-color: var(--color-gray-950);
  color-scheme: dark;
}`;

        const theme = `@theme inline {
  --radius-ui: var(--radius-lg);
  --radius-card: var(--radius-lg);
  --radius-checkbox: var(--radius);

  --color-primary: var(--color-primary-500);
  --color-secondary: var(--color-secondary-500);
  --color-accent: var(--color-accent-500);
  --color-info: var(--color-info-500);
  --color-warning: var(--color-warning-500);
  --color-danger: var(--color-danger-500);
  --color-success: var(--color-success-500);

  /* background colors  */
  --color-bg: var(--color-gray-950);
  --color-bg-subtle: var(--color-gray-900);
  --color-bg-surface: var(--color-gray-800);
  --color-bg-muted: var(--color-gray-700);
  --color-card: var(--color-bg);
  --color-popover: var(--color-bg);
  --color-overlay: var(--color-bg);

  /* foreground colors  */
  --color-fg: var(--color-gray-300);
  --color-fg-muted: var(--color-gray-400);
  --color-fg-subtitle: var(--color-gray-100);
  --color-fg-title: var(--color-white);

  /* border colors  */
  --color-border: var(--color-gray-900);
  --color-border-subtle: var(--color-gray-950);
  --color-border-strong: var(--color-gray-800);
  --color-border-input: var(--color-gray-800);
}`;
        return { root, theme };
    }
}
