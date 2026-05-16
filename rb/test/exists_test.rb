# UserAgentLookup SDK exists test

require "minitest/autorun"
require_relative "../UserAgentLookup_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = UserAgentLookupSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
