<?php
declare(strict_types=1);

// Typed models for the UserAgentLookup SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** UserAgent entity data model. */
class UserAgent
{
    public ?string $browser = null;
    public ?string $browser_version = null;
    public ?string $device = null;
    public ?string $os = null;
    public ?string $os_version = null;
    public ?string $platform = null;
}

/** Match filter for UserAgent#load (any subset of UserAgent fields). */
class UserAgentLoadMatch
{
    public ?string $browser = null;
    public ?string $browser_version = null;
    public ?string $device = null;
    public ?string $os = null;
    public ?string $os_version = null;
    public ?string $platform = null;
}

