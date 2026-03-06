<?php

namespace FlexiCore\Utils;

use FlexiCore\Core\Constants;
use Symfony\Component\HttpClient\HttpClient;

class HttpUtils
{
    public static function getJson(string $url, array $headers = [], array $params = []): ?array
    {
        try {
            if (class_exists(HttpClient::class)) {
                $client = HttpClient::create();

                $options = [];
                if (!empty($headers)) {
                    $options['headers'] = $headers;
                }
                if (!empty($params)) {
                    $options['query'] = $params;
                }

                $response = $client->request('GET', $url, $options);
                if ($response->getStatusCode() !== Constants::HTTP_OK) {
                    return null;
                }

                return $response->toArray();
            }

            return self::getJsonWithNativeHttp($url, $headers, $params);
        } catch (\Exception $e) {
            return null;
        }
    }

    private static function getJsonWithNativeHttp(string $url, array $headers = [], array $params = []): ?array
    {
        if (!empty($params)) {
            $query = http_build_query($params);
            $url .= (str_contains($url, '?') ? '&' : '?') . $query;
        }

        $headerLines = [];
        foreach ($headers as $name => $value) {
            $headerLines[] = "{$name}: {$value}";
        }

        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => implode("\r\n", $headerLines),
                'ignore_errors' => true,
                'timeout' => 20,
            ],
        ]);

        $raw = @file_get_contents($url, false, $context);
        if ($raw === false) {
            return null;
        }

        $statusLine = $http_response_header[0] ?? '';
        if (!str_contains($statusLine, ' 200 ')) {
            return null;
        }

        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : null;
    }
}
