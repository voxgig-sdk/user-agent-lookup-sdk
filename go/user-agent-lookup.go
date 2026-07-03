package voxgiguseragentlookupsdk

import (
	"github.com/voxgig-sdk/user-agent-lookup-sdk/go/core"
	"github.com/voxgig-sdk/user-agent-lookup-sdk/go/entity"
	"github.com/voxgig-sdk/user-agent-lookup-sdk/go/feature"
	_ "github.com/voxgig-sdk/user-agent-lookup-sdk/go/utility"
)

// Type aliases preserve external API.
type UserAgentLookupSDK = core.UserAgentLookupSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UserAgentLookupEntity = core.UserAgentLookupEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UserAgentLookupError = core.UserAgentLookupError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewUserAgentEntityFunc = func(client *core.UserAgentLookupSDK, entopts map[string]any) core.UserAgentLookupEntity {
		return entity.NewUserAgentEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewUserAgentLookupSDK = core.NewUserAgentLookupSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewUserAgentLookupSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *UserAgentLookupSDK  { return NewUserAgentLookupSDK(nil) }
func Test() *UserAgentLookupSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
