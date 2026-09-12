
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'UserAgentLookup',
        slug: "user-agent-lookup",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://www.useragentlookup.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      user_agent: {
      },

    }
  }


  entity = {
    "user_agent": {
      "fields": [
        {
          "name": "browser",
          "short": "Browser name",
          "type": "`$STRING`"
        },
        {
          "name": "browserVersion",
          "short": "Browser version",
          "type": "`$STRING`"
        },
        {
          "name": "device",
          "short": "Device type",
          "type": "`$STRING`"
        },
        {
          "name": "os",
          "short": "Operating system name",
          "type": "`$STRING`"
        },
        {
          "name": "osVersion",
          "short": "Operating system version",
          "type": "`$STRING`"
        },
        {
          "name": "platform",
          "short": "Platform information",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/user-agent",
              "segments": [
                {
                  "lit": "user-agent"
                }
              ],
              "select": {
                "exist": [
                  "ua"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "user-agent"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

