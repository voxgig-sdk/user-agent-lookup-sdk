<?php
declare(strict_types=1);

// UserAgentLookup SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UserAgentLookupFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UserAgentLookupBaseFeature();
            case "test":
                return new UserAgentLookupTestFeature();
            default:
                return new UserAgentLookupBaseFeature();
        }
    }
}
