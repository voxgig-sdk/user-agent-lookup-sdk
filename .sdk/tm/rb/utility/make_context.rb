# UserAgentLookup SDK utility: make_context
require_relative '../core/context'
module UserAgentLookupUtilities
  MakeContext = ->(ctxmap, basectx) {
    UserAgentLookupContext.new(ctxmap, basectx)
  }
end
