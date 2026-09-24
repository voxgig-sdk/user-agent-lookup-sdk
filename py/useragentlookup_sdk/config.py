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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Browser",
            "type": "`$STRING`",
            "short": "Browser name",
          },
          {
            "name": "browserVersion",
            "title": "Browser Version",
            "type": "`$STRING`",
            "short": "Browser version",
          },
          {
            "name": "device",
            "title": "Device",
            "type": "`$STRING`",
            "short": "Device type",
          },
          {
            "name": "os",
            "title": "Os",
            "type": "`$STRING`",
            "short": "Operating system name",
          },
          {
            "name": "osVersion",
            "title": "Os Version",
            "type": "`$STRING`",
            "short": "Operating system version",
          },
          {
            "name": "platform",
            "title": "Platform",
            "type": "`$STRING`",
            "short": "Platform information",
          },
        ],
        "name": "user_agent",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/user-agent",
                "segments": [
                  {
                    "lit": "user-agent",
                  },
                ],
                "parts": [
                  "user-agent",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "ua",
                      "orig": "ua",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "ua",
                  ],
                },
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
