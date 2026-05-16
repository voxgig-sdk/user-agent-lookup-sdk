<?php
declare(strict_types=1);

// UserAgentLookup SDK utility: feature_add

class UserAgentLookupFeatureAdd
{
    public static function call(UserAgentLookupContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
