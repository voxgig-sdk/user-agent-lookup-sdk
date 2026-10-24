-- UserAgentLookup SDK error

local json = require("dkjson")

local UserAgentLookupError = {}
UserAgentLookupError.__index = UserAgentLookupError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function UserAgentLookupError.new(code, msg, ctx)
  local self = setmetatable({}, UserAgentLookupError)
  self.is_sdk_error = true
  self.sdk = "UserAgentLookup"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function UserAgentLookupError:context()
  return CONTEXT[self]
end


function UserAgentLookupError:error()
  return self.msg
end


function UserAgentLookupError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function UserAgentLookupError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function UserAgentLookupError:to_json()
  return json.encode(self:to_table())
end


function UserAgentLookupError:__tostring()
  return self.msg
end


function UserAgentLookupError.__tojson(self)
  return self:to_json()
end


return UserAgentLookupError
