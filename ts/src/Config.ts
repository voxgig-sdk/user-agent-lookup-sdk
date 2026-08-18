
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'UserAgentLookup',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "browserVersion",
          "type": "`$STRING`"
        },
        {
          "name": "device",
          "type": "`$STRING`"
        },
        {
          "name": "os",
          "type": "`$STRING`"
        },
        {
          "name": "osVersion",
          "type": "`$STRING`"
        },
        {
          "name": "platform",
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
              "parts": [
                "user-agent"
              ],
              "select": {
                "exist": [
                  "ua"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

