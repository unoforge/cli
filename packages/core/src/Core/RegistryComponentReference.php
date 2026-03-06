<?php

namespace FlexiCore\Core;

class RegistryComponentReference
{
    public readonly string $componentName;

    public function __construct(
        public readonly string $component,
        public readonly ?string $namespace = null,
        public readonly ?string $version = null,
    ) {
        $this->componentName = $component;
    }

    public static function parse(string $input): self
    {
        $value = trim($input);
        if ($value === '') {
            throw new \InvalidArgumentException('Component reference cannot be empty.');
        }

        if (str_starts_with($value, '@')) {
            if (!preg_match('/^(@[A-Za-z0-9._-]+)\/([A-Za-z0-9._\/-]+?)(?:@([^\s@][^\s]*))?$/', $value, $matches)) {
                throw new \InvalidArgumentException("Invalid scoped component reference: {$input}");
            }

            return new self(
                component: $matches[2],
                namespace: $matches[1],
                version: isset($matches[3]) ? trim($matches[3]) : null,
            );
        }

        if (!preg_match('/^([A-Za-z0-9._\/-]+?)(?:@([^\s@][^\s]*))?$/', $value, $matches)) {
            throw new \InvalidArgumentException("Invalid component reference: {$input}");
        }

        return new self(
            component: $matches[1],
            version: isset($matches[2]) ? trim($matches[2]) : null,
        );
    }

    public function toDisplay(): string
    {
        $prefix = $this->namespace ? ($this->namespace . '/') : '';
        $version = $this->version ? ('@' . $this->version) : '';
        return $prefix . $this->component . $version;
    }
}
