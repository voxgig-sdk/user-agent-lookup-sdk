-- UserAgentLookup SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UserAgentLookup",
      slug = "user-agent-lookup",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://www.useragentlookup.com/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["user_agent"] = {},
      },
    },
    entity = {
      ["user_agent"] = {
        ["fields"] = {
          {
            ["name"] = "browser",
            ["title"] = "Browser",
            ["type"] = "`$STRING`",
            ["short"] = "Browser name",
          },
          {
            ["name"] = "browserVersion",
            ["title"] = "Browser Version",
            ["type"] = "`$STRING`",
            ["short"] = "Browser version",
          },
          {
            ["name"] = "device",
            ["title"] = "Device",
            ["type"] = "`$STRING`",
            ["short"] = "Device type",
          },
          {
            ["name"] = "os",
            ["title"] = "Os",
            ["type"] = "`$STRING`",
            ["short"] = "Operating system name",
          },
          {
            ["name"] = "osVersion",
            ["title"] = "Os Version",
            ["type"] = "`$STRING`",
            ["short"] = "Operating system version",
          },
          {
            ["name"] = "platform",
            ["title"] = "Platform",
            ["type"] = "`$STRING`",
            ["short"] = "Platform information",
          },
        },
        ["name"] = "user_agent",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/user-agent",
                ["segments"] = {
                  {
                    ["lit"] = "user-agent",
                  },
                },
                ["parts"] = {
                  "user-agent",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "ua",
                      ["orig"] = "ua",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "ua",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
