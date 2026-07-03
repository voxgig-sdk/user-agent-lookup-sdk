<?php
declare(strict_types=1);

// UserAgentLookup SDK configuration

class UserAgentLookupConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "UserAgentLookup",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.useragentlookup.com/api",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "user_agent" => [],
                ],
            ],
            "entity" => [
        'user_agent' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'browser',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'browser_version',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'device',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'os',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'os_version',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'platform',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
          ],
          'name' => 'user_agent',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'kind' => 'query',
                        'name' => 'ua',
                        'orig' => 'ua',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/user-agent',
                  'parts' => [
                    'user-agent',
                  ],
                  'select' => [
                    'exist' => [
                      'ua',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return UserAgentLookupFeatures::make_feature($name);
    }
}
