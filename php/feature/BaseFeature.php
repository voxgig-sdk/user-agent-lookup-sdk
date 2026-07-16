<?php
declare(strict_types=1);

// UserAgentLookup SDK base feature

class UserAgentLookupBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UserAgentLookupContext $ctx, array $options): void {}
    public function PostConstruct(UserAgentLookupContext $ctx): void {}
    public function PostConstructEntity(UserAgentLookupContext $ctx): void {}
    public function SetData(UserAgentLookupContext $ctx): void {}
    public function GetData(UserAgentLookupContext $ctx): void {}
    public function GetMatch(UserAgentLookupContext $ctx): void {}
    public function SetMatch(UserAgentLookupContext $ctx): void {}
    public function PrePoint(UserAgentLookupContext $ctx): void {}
    public function PreSpec(UserAgentLookupContext $ctx): void {}
    public function PreRequest(UserAgentLookupContext $ctx): void {}
    public function PreResponse(UserAgentLookupContext $ctx): void {}
    public function PreResult(UserAgentLookupContext $ctx): void {}
    public function PreDone(UserAgentLookupContext $ctx): void {}
    public function PreUnexpected(UserAgentLookupContext $ctx): void {}
}
