export class StyleWindLight {
    static get() {
                const root = `

:root {
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

}`;

        const theme = `
@theme inline {
    --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    --radius-ui: var(--ui-radius);
    --radius-card: var(--card-radius);
    --radius-checkbox: var(--checkbox-radius);
    --radius-dropdown-item: var(--popover-inner-radius, 0px);

    --color-ring: var(--color-primary-600);

    --color-primary: var(--color-primary-600);
    --color-secondary: var(--color-secondary-600);
    --color-accent: var(--color-accent-600);
    --color-info: var(--color-info-600);
    --color-warning: var(--color-warning-600);
    --color-danger: var(--color-danger-600);
    --color-success: var(--color-success-600);

    --color-fg-title: var(--color-gray-900);
    --color-fg-subtitle: var(--color-gray-800);
    --color-fg: var(--color-gray-700);
    --color-fg-muted: var(--color-gray-600);

    --color-bg: var(--color-white);
    --color-bg-subtle: var(--color-gray-100);
    --color-bg-surface: var(--color-gray-50);
    --color-bg-muted: var(--color-gray-200);
    --color-card: var(--color-bg);
    --color-popover: var(--color-bg);
    --color-overlay: var(--color-gray-950);
    
    --color-border-strong: var(--color-gray-300);
    --color-border: var(--color-gray-200);
    --color-border-sub: var(--color-gray-100);
    --color-border-card: var(--color-gray-200);
    --color-border-input: var(--color-gray-200);
}`;
        return { root, theme };
    }
}
