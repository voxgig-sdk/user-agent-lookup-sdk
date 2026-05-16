<?php
declare(strict_types=1);

// UserAgentLookup SDK utility: result_body

class UserAgentLookupResultBody
{
    public static function call(UserAgentLookupContext $ctx): ?UserAgentLookupResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
