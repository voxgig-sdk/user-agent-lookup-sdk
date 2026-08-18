-- UserAgentLookup SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UserAgentLookup",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "browserVersion",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "device",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "os",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "osVersion",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "platform",
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
                ["parts"] = {
                  "user-agent",
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
