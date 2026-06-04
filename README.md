# UserAgentLookup SDK

Parse a User-Agent string into structured browser, OS, and device data

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About User Agent Lookup API

[User Agent Lookup](https://www.useragentlookup.com/) is a small public service that parses raw `User-Agent` strings and returns structured information about the requesting browser, operating system, and device.

What you get from the API:

- A single `GET` endpoint that accepts a `ua` query parameter containing the User-Agent string
- A JSON response with parsed fields describing the client (the maintainers note the output is stable but new fields may be added over time)

Operational notes:

- Base URL: `https://www.useragentlookup.com/api`
- No API key or auth header is required
- The service advertises no rate limiting and high uptime, but CORS is disabled, so requests should be issued from a server rather than directly from a browser

## Try it

**TypeScript**
```bash
npm install user-agent-lookup
```

**Python**
```bash
pip install user-agent-lookup-sdk
```

**PHP**
```bash
composer require voxgig/user-agent-lookup-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/user-agent-lookup-sdk/go
```

**Ruby**
```bash
gem install user-agent-lookup-sdk
```

**Lua**
```bash
luarocks install user-agent-lookup-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { UserAgentLookupSDK } from 'user-agent-lookup'

const client = new UserAgentLookupSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o user-agent-lookup-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "user-agent-lookup": {
      "command": "/abs/path/to/user-agent-lookup-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **UserAgent** | A parsed representation of a `User-Agent` header string, retrieved via `GET /user-agent?ua={user-agent-string}`. | `/user-agent` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from useragentlookup_sdk import UserAgentLookupSDK

client = UserAgentLookupSDK({})


# Load a specific useragent
useragent, err = client.UserAgent(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'useragentlookup_sdk.php';

$client = new UserAgentLookupSDK([]);


// Load a specific useragent
[$useragent, $err] = $client->UserAgent(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/user-agent-lookup-sdk/go"

client := sdk.NewUserAgentLookupSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "UserAgentLookup_sdk"

client = UserAgentLookupSDK.new({})


# Load a specific useragent
useragent, err = client.UserAgent(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("user-agent-lookup_sdk")

local client = sdk.new({})


-- Load a specific useragent
local useragent, err = client:UserAgent(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = UserAgentLookupSDK.test()
const result = await client.UserAgent().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = UserAgentLookupSDK.test(None, None)
result, err = client.UserAgent(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = UserAgentLookupSDK::test(null, null);
[$result, $err] = $client->UserAgent(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.UserAgent(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = UserAgentLookupSDK.test(nil, nil)
result, err = client.UserAgent(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:UserAgent(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the User Agent Lookup API

- Upstream: [https://www.useragentlookup.com/](https://www.useragentlookup.com/)

- Free to use for any number of requests
- No authentication or API key required
- No published rate limits
- CORS is not enabled, so calls must be made server-side

---

Generated from the User Agent Lookup API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
