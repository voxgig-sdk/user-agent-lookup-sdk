// Typed models for the UserAgentLookup SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface UserAgent {
  browser?: string
  browser_version?: string
  device?: string
  os?: string
  os_version?: string
  platform?: string
}

export type UserAgentLoadMatch = Partial<UserAgent>

