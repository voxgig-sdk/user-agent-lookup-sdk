# frozen_string_literal: true

# Typed models for the UserAgentLookup SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# UserAgent entity data model.
#
# @!attribute [rw] browser
#   @return [String, nil]
#
# @!attribute [rw] browser_version
#   @return [String, nil]
#
# @!attribute [rw] device
#   @return [String, nil]
#
# @!attribute [rw] os
#   @return [String, nil]
#
# @!attribute [rw] os_version
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
UserAgent = Struct.new(
  :browser,
  :browser_version,
  :device,
  :os,
  :os_version,
  :platform,
  keyword_init: true
)

# Match filter for UserAgent#load (any subset of UserAgent fields).
#
# @!attribute [rw] browser
#   @return [String, nil]
#
# @!attribute [rw] browser_version
#   @return [String, nil]
#
# @!attribute [rw] device
#   @return [String, nil]
#
# @!attribute [rw] os
#   @return [String, nil]
#
# @!attribute [rw] os_version
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
UserAgentLoadMatch = Struct.new(
  :browser,
  :browser_version,
  :device,
  :os,
  :os_version,
  :platform,
  keyword_init: true
)

