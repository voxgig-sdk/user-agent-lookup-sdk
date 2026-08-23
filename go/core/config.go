package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "UserAgentLookup",
			"slug": "user-agent-lookup",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://www.useragentlookup.com/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"user_agent": map[string]any{},
			},
		},
		"entity": map[string]any{
			"user_agent": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "browser",
						"short": "Browser name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "browserVersion",
						"short": "Browser version",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "device",
						"short": "Device type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "os",
						"short": "Operating system name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "osVersion",
						"short": "Operating system version",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "platform",
						"short": "Platform information",
						"type": "`$STRING`",
					},
				},
				"name": "user_agent",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
											"kind": "query",
											"name": "ua",
											"orig": "ua",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/user-agent",
								"parts": []any{
									"user-agent",
								},
								"select": map[string]any{
									"exist": []any{
										"ua",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
