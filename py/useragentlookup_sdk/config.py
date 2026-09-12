# UserAgentLookup SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "UserAgentLookup",
            "slug": "user-agent-lookup",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://www.useragentlookup.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "user_agent": {},
            },
        },
        "entity": {
      "user_agent": {
        "fields": [
          {
            "name": "browser",
            "short": "Browser name",
            "type": "`$STRING`",
          },
          {
            "name": "browserVersion",
            "short": "Browser version",
            "type": "`$STRING`",
          },
          {
            "name": "device",
            "short": "Device type",
            "type": "`$STRING`",
          },
          {
            "name": "os",
            "short": "Operating system name",
            "type": "`$STRING`",
          },
          {
            "name": "osVersion",
            "short": "Operating system version",
            "type": "`$STRING`",
          },
          {
            "name": "platform",
            "short": "Platform information",
            "type": "`$STRING`",
          },
        ],
        "name": "user_agent",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                      "kind": "query",
                      "name": "ua",
                      "orig": "ua",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/user-agent",
                "segments": [
                  {
                    "lit": "user-agent",
                  },
                ],
                "select": {
                  "exist": [
                    "ua",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "user-agent",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
