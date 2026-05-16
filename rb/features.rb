# UserAgentLookup SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UserAgentLookupFeatures
  def self.make_feature(name)
    case name
    when "base"
      UserAgentLookupBaseFeature.new
    when "test"
      UserAgentLookupTestFeature.new
    else
      UserAgentLookupBaseFeature.new
    end
  end
end
