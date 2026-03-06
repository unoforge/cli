<?php

namespace FlexiCore\Core;

class RegistryStore
{
    protected string $file;
    protected array $data = ['installed' => []];

    public function init()
    {
        $this->file = getcwd() . "/components.json";

        if (file_exists($this->file)) {
            $json = file_get_contents($this->file);
            $this->data = json_decode($json, true) ?: ['installed' => []];
        } else {
            $this->persist();
        }
    }

    public function add(string $name, string $namespace, string $version, mixed $message = null): void
    {
        $messages = $this->normalizeMessages($message);

        foreach ($this->data['installed'] as &$item) {
            if ($item['name'] === $name && $item['namespace'] === $namespace) {
                $item['version'] = $version;
                if (!empty($messages)) {
                    $item['messages'] = $messages;
                } else {
                    unset($item['messages']);
                }
                $this->persist();
                return;
            }
        }
        $newItem = [
            'name' => $name,
            'namespace' => $namespace,
            'version' => $version,
        ];
        if (!empty($messages)) {
            $newItem['messages'] = $messages;
        }
        $this->data['installed'][] = $newItem;
        $this->persist();
    }

    public function exists(string $name, string $namespace): bool
    {
        return (bool) $this->findIndex($name, $namespace);
    }

    public function getVersion(string $name, string $namespace): ?string
    {
        $index = $this->findIndex($name, $namespace);
        return $index !== null ? $this->data['installed'][$index]['version'] : null;
    }

    public function updateVersion(string $name, string $namespace, string $newVersion): void
    {
        $index = $this->findIndex($name, $namespace);
        if ($index !== null) {
            $this->data['installed'][$index]['version'] = $newVersion;
            $this->persist();
        } else {
            throw new \RuntimeException("Component not found: {$namespace}/{$name}");
        }
    }

    public function all(): array
    {
        return $this->data['installed'];
    }

    protected function findIndex(string $name, string $namespace): ?int
    {
        foreach ($this->data['installed'] as $i => $item) {
            if ($item['name'] === $name && $item['namespace'] === $namespace) {
                return $i;
            }
        }
        return null;
    }

    protected function persist(): void
    {
        file_put_contents($this->file, json_encode($this->data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    private function normalizeMessages(mixed $message): array
    {
        if (is_string($message)) {
            $trimmed = trim($message);
            return $trimmed === '' ? [] : [$trimmed];
        }

        if (!is_array($message)) {
            return [];
        }

        $messages = [];
        foreach ($message as $entry) {
            if (!is_string($entry)) {
                continue;
            }

            $trimmed = trim($entry);
            if ($trimmed !== '') {
                $messages[] = $trimmed;
            }
        }

        return array_values(array_unique($messages));
    }
}
