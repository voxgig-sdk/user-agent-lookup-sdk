# UserAgentLookup SDK utility: feature_add
module UserAgentLookupUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
