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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
            ["short"] = "Browser name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "browserVersion",
            ["short"] = "Browser version",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "device",
            ["short"] = "Device type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "os",
            ["short"] = "Operating system name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "osVersion",
            ["short"] = "Operating system version",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "platform",
            ["short"] = "Platform information",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "user_agent",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                      ["kind"] = "query",
                      ["name"] = "ua",
                      ["orig"] = "ua",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/user-agent",
                ["segments"] = {
                  {
                    ["lit"] = "user-agent",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "ua",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "user-agent",
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
