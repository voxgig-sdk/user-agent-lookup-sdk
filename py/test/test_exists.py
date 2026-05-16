# ProjectName SDK exists test

import pytest
from useragentlookup_sdk import UserAgentLookupSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UserAgentLookupSDK.test(None, None)
        assert testsdk is not None
