<?php
declare(strict_types=1);

// UserAgentLookup SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

UserAgentLookupUtility::setRegistrar(function (UserAgentLookupUtility $u): void {
    $u->clean = [UserAgentLookupClean::class, 'call'];
    $u->done = [UserAgentLookupDone::class, 'call'];
    $u->make_error = [UserAgentLookupMakeError::class, 'call'];
    $u->feature_add = [UserAgentLookupFeatureAdd::class, 'call'];
    $u->feature_hook = [UserAgentLookupFeatureHook::class, 'call'];
    $u->feature_init = [UserAgentLookupFeatureInit::class, 'call'];
    $u->fetcher = [UserAgentLookupFetcher::class, 'call'];
    $u->make_fetch_def = [UserAgentLookupMakeFetchDef::class, 'call'];
    $u->make_context = [UserAgentLookupMakeContext::class, 'call'];
    $u->make_options = [UserAgentLookupMakeOptions::class, 'call'];
    $u->make_request = [UserAgentLookupMakeRequest::class, 'call'];
    $u->make_response = [UserAgentLookupMakeResponse::class, 'call'];
    $u->make_result = [UserAgentLookupMakeResult::class, 'call'];
    $u->make_point = [UserAgentLookupMakePoint::class, 'call'];
    $u->make_spec = [UserAgentLookupMakeSpec::class, 'call'];
    $u->make_url = [UserAgentLookupMakeUrl::class, 'call'];
    $u->param = [UserAgentLookupParam::class, 'call'];
    $u->prepare_auth = [UserAgentLookupPrepareAuth::class, 'call'];
    $u->prepare_body = [UserAgentLookupPrepareBody::class, 'call'];
    $u->prepare_headers = [UserAgentLookupPrepareHeaders::class, 'call'];
    $u->prepare_method = [UserAgentLookupPrepareMethod::class, 'call'];
    $u->prepare_params = [UserAgentLookupPrepareParams::class, 'call'];
    $u->prepare_path = [UserAgentLookupPreparePath::class, 'call'];
    $u->prepare_query = [UserAgentLookupPrepareQuery::class, 'call'];
    $u->result_basic = [UserAgentLookupResultBasic::class, 'call'];
    $u->result_body = [UserAgentLookupResultBody::class, 'call'];
    $u->result_headers = [UserAgentLookupResultHeaders::class, 'call'];
    $u->transform_request = [UserAgentLookupTransformRequest::class, 'call'];
    $u->transform_response = [UserAgentLookupTransformResponse::class, 'call'];
});
