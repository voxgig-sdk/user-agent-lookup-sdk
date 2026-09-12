<?php
declare(strict_types=1);

// UserAgentLookup SDK configuration

class UserAgentLookupConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "UserAgentLookup",
                "slug" => "user-agent-lookup",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://www.useragentlookup.com/api",
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
              'name' => 'browser',
              'short' => 'Browser name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'browserVersion',
              'short' => 'Browser version',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'device',
              'short' => 'Device type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'os',
              'short' => 'Operating system name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'osVersion',
              'short' => 'Operating system version',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'platform',
              'short' => 'Platform information',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'user_agent',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'kind' => 'query',
                        'name' => 'ua',
                        'orig' => 'ua',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/user-agent',
                  'segments' => [
                    [
                      'lit' => 'user-agent',
                    ],
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
                  'parts' => [
                    'user-agent',
                  ],
                ],
              ],
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
