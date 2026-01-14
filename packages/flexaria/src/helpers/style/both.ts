export class StyleWindBoth {
    static get() {
        const root = `
@custom-variant dark (&:is(.dark *));

:root {
    --c-primary: var(--color-primary-600);
    --c-secondary: var(--color-secondary-600);
    --c-accent: var(--color-accent-600);
    --c-info: var(--color-info-600);
    --c-warning: var(--color-warning-600);
    --c-danger: var(--color-danger-600);
    --c-success: var(--color-success-600);

    --c-fg-title: var(--color-gray-900);
    --c-fg-subtitle: var(--color-gray-800);
    --c-fg: var(--color-gray-700);
    --c-fg-muted: var(--color-gray-600);

    --c-bg: var(--color-white);
    --c-bg-subtle: var(--color-gray-100);
    --c-bg-surface: var(--color-gray-50);
    --c-bg-muted: var(--color-gray-200);
    --c-bg-surface-elevated: var(--color-gray-300);
    --c-card: var(--color-bg);
    --c-card-gray: var(--color-bg-subtle);
    --c-overlay: var(--c-bg);
    --c-overlay-gray: var(--c-bg-subtle);


    --c-border-strong: var(--color-gray-300);
    --c-border-amphasis: var(--color-gray-400);
    --c-border: var(--color-gray-200);
    --c-border-sub: var(--color-gray-100);
    --c-border-card:var(--color-gray-200);
    --c-border-input: var(--color-gray-200);



    --ui-input-focus-outline: var(--c-primary);
    --ui-input-place-holder: var(--c-gray-500);
    --ui-input-invalid-outline: var(--c-danger);
    --ring-bg: var(--c-primary);
    --ring-offset-color: var(--c-bg);

    --focus-ring: var(--c-primary-200);

    --ui-radius: var(--radius-lg);
    --card-radius: var(--radius-lg);
    --checkbox-radius: var(--radius-sm);

    --checkbox-bg: var(--c-bg);
    --checkbox-fg: transparent;
    --checkbox-bg-checked: var(--color-primary);
    --checkbox-fg-checked: var(--color-white);
    --checkbox-bg-invalid: var(--c-danger);
    --checkbox-fg-invalid: var(--color-white);


    --dropdown-item-hover-and-select: var(--color-bg-muted);
    --dropdown-item-hover-and-select-fg: var(--color-fg-title);
    --dropdown-item-selected-fg: var(--color-fg-title);

    --dropdown-item-danger-fg: var(--color-danger);
    --dropdown-item-warning-fg: var(--color-warning);
    --dropdown-item-danger-hover-and-select: --alpha(var(--color-danger-100)/40%);
    --dropdown-item-danger-hover-and-select-fg: var(--color-danger-600);
    --dropdown-item-warning-hover-and-select: --alpha(var(--color-warning-100)/40%);
    --dropdown-item-warning-hover-and-select-fg: var(--color-warning-600);


    --date-segment-focus-bg: var(--color-primary);
    --date-segment-focus-fg: var(--color-white);
    --range-selected-bg: var(--color-primary-100);
    --range-selected-invalid-bg: var(--color-danger-100);

    --range-selected-bg-hover: var(--color-primary-200);
    --range-selected-invalid-bg-hover: var(--color-danger-200);

    --range-selected-fg: var(--color-primary-600);
    --range-selected-invalid-fg: var(--color-danger-600);

    --range-selected-bg-pressed: var(--color-primary-300);
    --range-selected-invalid-bg-pressed: var(--color-danger-300);

}

.dark {
    --c-primary: var(--color-primary-500);
    --c-secondary: var(--color-secondary-500);
    --c-accent: var(--color-accent-500);
    --c-info: var(--color-info-500);
    --c-warning: var(--color-warning-500);
    --c-danger: var(--color-danger-500);
    --c-success: var(--color-success-500);

    --c-fg-title: var(--color-white);
    --c-fg-subtitle: var(--color-gray-100);
    --c-fg: var(--color-gray-300);
    --c-fg-muted: var(--color-gray-400);

    --c-bg: var(--color-gray-950);
    --c-bg-subtle: var(--color-gray-900);
    --c-bg-surface: --aplha(var(--color-gray-900)/80%);
    --c-bg-muted: var(--color-gray-800);
    --c-bg-surface-elevated: var(--color-gray-700);

    --c-border-strong: var(--color-gray-700);
    --c-border-amphasis: var(--color-gray-600);
    --c-border: var(--color-gray-900);
    --c-border-sub: var(--color-gray-900);
    --c-border-card:var(--color-gray-800);

    --c-border-input: var(--c-gray-700);
    --focus-ring: --alpha(var(--c-primary-800)/30%);

    --dropdown-item-danger-hover-and-select: --alpha(var(--color-danger-900)/30%);
    --dropdown-item-danger-Ïhover-and-select-fg: var(--color-danger-300);
    --dropdown-item-warning-hover-and-select: --alpha(var(--color-warning-900)/30%);
    --dropdown-item-warning-hover-and-select-fg: var(--color-warning-300);

    --range-selected-bg: --alpha(var(--color-primary-900)/30%);
    --range-selected-invalid-bg: --alpha(var(--color-danger-800)/30%);

    --range-selected-bg-hover: var(--color-primary-800);
    --range-selected-invalid-bg-hover: var(--color-danger-800);

    --range-selected-fg: var(--color-primary-200);
    --range-selected-invalid-fg: var(--color-danger-200);

    --range-selected-bg-pressed: var(--color-primary-700);
    --range-selected-invalid-bg-pressed: var(--color-danger-700);
}
`;

        const theme = `
@theme inline {
    --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    --radius-ui: var(--ui-radius);
    --radius-card: var(--card-radius);
    --radius-checkbox: var(--checkbox-radius);
    --radius-dropdown-item: var(--popover-inner-radius, 0px);

    --color-dark: var(--c-gray-950);
    --color-ring: var(--color-primary-600);

    --color-primary: var(--c-primary);
    --color-secondary: var(--c-secondary);
    --color-accent: var(--c-accent);
    --color-info: var(--c-info);
    --color-warning: var(--c-warning);
    --color-danger: var(--c-danger);
    --color-success: var(--c-success);

    --color-fg-title: var(--c-fg-title);
    --color-fg-subtitle: var(--c-fg-subtitle);
    --color-fg: var(--c-fg);
    --color-fg-muted: var(--c-fg-muted);

    --color-bg: var(--c-bg);
    --color-bg-subtle: var(--c-bg-subtle);
    --color-bg-surface: var(--c-bg-surface);
    --color-bg-muted: var(--c-bg-muted);
    --color-bg-surface-elevated: var(--c-bg-surface-elevated);
    --color-card: var(--c-card);
    --color-card-gray: var(--c-card-gray);
    --color-popover: var(--c-bg);
    --color-popover-gray: var(--c-card-gray);
    --color-overlay: var(--c-overlay);
    --color-overlay-gray: var(--c-overlay-gray);
    --color-progressbar: var(--c-progressbar);

    --color-border-strong: var(--c-border-strong);
    --color-border-amphasis: var(--c-border-amphasis);
    --color-border: var(--c-border);
    --color-border-sub: var(--c-border-sub);
    --color-border-card: var(--c-border-card);
    --color-border-input: var(--c-border-input);
}`;
        return { root, theme };
    }
}
