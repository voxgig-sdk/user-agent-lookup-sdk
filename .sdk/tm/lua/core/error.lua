-- UserAgentLookup SDK error

local UserAgentLookupError = {}
UserAgentLookupError.__index = UserAgentLookupError


function UserAgentLookupError.new(code, msg, ctx)
  local self = setmetatable({}, UserAgentLookupError)
  self.is_sdk_error = true
  self.sdk = "UserAgentLookup"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UserAgentLookupError:error()
  return self.msg
end


function UserAgentLookupError:__tostring()
  return self.msg
end


return UserAgentLookupError
