<?php
declare(strict_types=1);

// UserAgentLookup SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UserAgentLookupMakeContext
{
    public static function call(array $ctxmap, ?UserAgentLookupContext $basectx): UserAgentLookupContext
    {
        return new UserAgentLookupContext($ctxmap, $basectx);
    }
}
