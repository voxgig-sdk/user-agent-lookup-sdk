<?php
declare(strict_types=1);

// UserAgentLookup SDK utility: prepare_body

class UserAgentLookupPrepareBody
{
    public static function call(UserAgentLookupContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
