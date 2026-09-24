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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'Browser',
              'type' => '`$STRING`',
              'short' => 'Browser name',
            ],
            [
              'name' => 'browserVersion',
              'title' => 'Browser Version',
              'type' => '`$STRING`',
              'short' => 'Browser version',
            ],
            [
              'name' => 'device',
              'title' => 'Device',
              'type' => '`$STRING`',
              'short' => 'Device type',
            ],
            [
              'name' => 'os',
              'title' => 'Os',
              'type' => '`$STRING`',
              'short' => 'Operating system name',
            ],
            [
              'name' => 'osVersion',
              'title' => 'Os Version',
              'type' => '`$STRING`',
              'short' => 'Operating system version',
            ],
            [
              'name' => 'platform',
              'title' => 'Platform',
              'type' => '`$STRING`',
              'short' => 'Platform information',
            ],
          ],
          'name' => 'user_agent',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/user-agent',
                  'segments' => [
                    [
                      'lit' => 'user-agent',
                    ],
                  ],
                  'parts' => [
                    'user-agent',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'ua',
                        'orig' => 'ua',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ua',
                    ],
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
