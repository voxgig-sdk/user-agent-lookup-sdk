# UserAgentLookup SDK configuration

module UserAgentLookupConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "UserAgentLookup",
        "slug" => "user-agent-lookup",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://www.useragentlookup.com/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "user_agent" => {},
        },
      },
      "entity" => {
        "user_agent" => {
          "fields" => [
            {
              "name" => "browser",
              "short" => "Browser name",
              "type" => "`$STRING`",
            },
            {
              "name" => "browserVersion",
              "short" => "Browser version",
              "type" => "`$STRING`",
            },
            {
              "name" => "device",
              "short" => "Device type",
              "type" => "`$STRING`",
            },
            {
              "name" => "os",
              "short" => "Operating system name",
              "type" => "`$STRING`",
            },
            {
              "name" => "osVersion",
              "short" => "Operating system version",
              "type" => "`$STRING`",
            },
            {
              "name" => "platform",
              "short" => "Platform information",
              "type" => "`$STRING`",
            },
          ],
          "name" => "user_agent",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        "kind" => "query",
                        "name" => "ua",
                        "orig" => "ua",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/user-agent",
                  "parts" => [
                    "user-agent",
                  ],
                  "select" => {
                    "exist" => [
                      "ua",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    UserAgentLookupFeatures.make_feature(name)
  end
end
