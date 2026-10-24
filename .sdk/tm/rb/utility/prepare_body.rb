# UserAgentLookup SDK utility: prepare_body
require_relative 'media'
module UserAgentLookupUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return UserAgentLookupUtilities.raw_body(ctx.reqdata) if UserAgentLookupUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
