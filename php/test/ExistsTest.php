<?php
declare(strict_types=1);

// UserAgentLookup SDK exists test

require_once __DIR__ . '/../useragentlookup_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = UserAgentLookupSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
