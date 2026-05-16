<?php
declare(strict_types=1);

// UserAgentLookup SDK utility: result_headers

class UserAgentLookupResultHeaders
{
    public static function call(UserAgentLookupContext $ctx): ?UserAgentLookupResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
