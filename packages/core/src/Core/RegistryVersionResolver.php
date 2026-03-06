<?php

namespace FlexiCore\Core;

use FlexiCore\Utils\HttpUtils;

class RegistryVersionResolver
{
    /**
     * @return array{registry: array, resolvedVersion: string|null, url: string}|null
     */
    public function resolve(
        string $baseUrl,
        string $componentName,
        ?string $requestedVersion = null,
        array $headers = [],
        array $params = []
    ): ?array {
        $resolvedVersion = $this->normalizeVersion($requestedVersion);
        $attempts = $this->buildAttempts($baseUrl, $componentName, $resolvedVersion, $params);

        foreach ($attempts as $attempt) {
            $json = HttpUtils::getJson($attempt['url'], $headers, $attempt['params']);
            if (!is_array($json)) {
                continue;
            }

            if ($resolvedVersion !== null) {
                $registryVersion = isset($json['version']) ? (string) $json['version'] : null;
                if ($registryVersion !== null && $registryVersion !== $resolvedVersion) {
                    continue;
                }
            }

            return [
                'registry' => $json,
                'resolvedVersion' => isset($json['version']) ? (string) $json['version'] : $resolvedVersion,
                'url' => $attempt['url'],
            ];
        }

        return null;
    }

    /**
     * @return array<int, array{url: string, params: array}>
     */
    private function buildAttempts(string $baseUrl, string $componentName, ?string $version, array $params): array
    {
        $attempts = [];

        if ($version !== null && str_contains($baseUrl, '{version}')) {
            $attempts[] = [
                'url' => str_replace(['{name}', '{version}'], [$componentName, $version], $baseUrl),
                'params' => $params,
            ];
        }

        if ($version !== null) {
            $resolvedBase = str_replace('{name}', $componentName, str_replace('{version}', '', $baseUrl));
            $attempts[] = [
                'url' => $this->buildVersionedPathUrl($resolvedBase, $version),
                'params' => $params,
            ];
            $attempts[] = [
                'url' => str_replace('{name}', $componentName, str_replace('{version}', '', $baseUrl)),
                'params' => array_merge($params, ['version' => $version]),
            ];
        } else {
            $attempts[] = [
                'url' => str_replace(['{name}', '{version}'], [$componentName, 'latest'], $baseUrl),
                'params' => $params,
            ];
            $attempts[] = [
                'url' => str_replace('{name}', $componentName, str_replace('{version}', '', $baseUrl)),
                'params' => $params,
            ];
        }

        $deduped = [];
        $seen = [];
        foreach ($attempts as $attempt) {
            $url = trim($attempt['url']);
            if ($url === '') {
                continue;
            }

            $key = $url . '|' . md5(json_encode($attempt['params']));
            if (isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;
            $deduped[] = ['url' => $url, 'params' => $attempt['params']];
        }

        return $deduped;
    }

    private function buildVersionedPathUrl(string $baseUrl, string $version): string
    {
        $parts = explode('?', $baseUrl, 2);
        $path = rtrim($parts[0], '/');

        if (str_ends_with($path, '.json')) {
            $path = substr($path, 0, -5) . '/' . $version . '.json';
        } else {
            $path .= '/' . $version . '.json';
        }

        if (isset($parts[1]) && $parts[1] !== '') {
            return $path . '?' . $parts[1];
        }

        return $path;
    }

    private function normalizeVersion(?string $version): ?string
    {
        if ($version === null) {
            return null;
        }

        $trimmed = trim($version);
        return $trimmed === '' ? null : $trimmed;
    }
}
