# Typed models for the UserAgentLookup SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class UserAgent:
    browser: Optional[str] = None
    browser_version: Optional[str] = None
    device: Optional[str] = None
    os: Optional[str] = None
    os_version: Optional[str] = None
    platform: Optional[str] = None


@dataclass
class UserAgentLoadMatch:
    browser: Optional[str] = None
    browser_version: Optional[str] = None
    device: Optional[str] = None
    os: Optional[str] = None
    os_version: Optional[str] = None
    platform: Optional[str] = None

