package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewUserAgentEntityFunc func(client *UserAgentLookupSDK, entopts map[string]any) UserAgentLookupEntity

