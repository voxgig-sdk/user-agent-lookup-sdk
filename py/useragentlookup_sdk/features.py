# UserAgentLookup SDK feature factory

from useragentlookup_sdk.feature.base_feature import UserAgentLookupBaseFeature
from useragentlookup_sdk.feature.ratelimit_feature import UserAgentLookupRatelimitFeature
from useragentlookup_sdk.feature.retry_feature import UserAgentLookupRetryFeature
from useragentlookup_sdk.feature.test_feature import UserAgentLookupTestFeature
from useragentlookup_sdk.feature.timeout_feature import UserAgentLookupTimeoutFeature


_FEATURES = {
    "base": lambda: UserAgentLookupBaseFeature(),
    "ratelimit": lambda: UserAgentLookupRatelimitFeature(),
    "retry": lambda: UserAgentLookupRetryFeature(),
    "test": lambda: UserAgentLookupTestFeature(),
    "timeout": lambda: UserAgentLookupTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
