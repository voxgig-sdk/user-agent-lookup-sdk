# UserAgentLookup SDK feature factory

from useragentlookup_sdk.feature.base_feature import UserAgentLookupBaseFeature
from useragentlookup_sdk.feature.test_feature import UserAgentLookupTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UserAgentLookupBaseFeature(),
        "test": lambda: UserAgentLookupTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
