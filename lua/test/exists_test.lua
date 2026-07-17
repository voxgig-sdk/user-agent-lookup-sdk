-- UserAgentLookup SDK exists test

local sdk = require("user-agent-lookup_sdk")

describe("UserAgentLookupSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
