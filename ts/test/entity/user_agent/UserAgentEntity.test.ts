
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { UserAgentLookupSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('UserAgentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USERAGENTLOOKUP_TEST_LIVE=TRUE.
  afterEach(liveDelay('USERAGENTLOOKUP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UserAgentLookupSDK.test()
    const ent = testsdk.UserAgent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USER_AGENT_LOOKUP_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'user_agent.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set USER_AGENT_LOOKUP_TEST_USER_AGENT_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_agent_ref01_data = Object.values(setup.data.existing.user_agent)[0] as any

    // LOAD
    const user_agent_ref01_ent = client.UserAgent()
    const user_agent_ref01_match_dt0: any = {}
    const user_agent_ref01_data_dt0 = await user_agent_ref01_ent.load(user_agent_ref01_match_dt0)
    assert(null != user_agent_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user_agent/UserAgentTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UserAgentLookupSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['user_agent01','user_agent02','user_agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['USER_AGENT_LOOKUP_TEST_USER_AGENT_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'USER_AGENT_LOOKUP_TEST_USER_AGENT_ENTID': idmap,
    'USER_AGENT_LOOKUP_TEST_LIVE': 'FALSE',
    'USER_AGENT_LOOKUP_TEST_EXPLAIN': 'FALSE',
    'USER_AGENT_LOOKUP_APIKEY': 'NONE',
  })

  idmap = env['USER_AGENT_LOOKUP_TEST_USER_AGENT_ENTID']

  const live = 'TRUE' === env.USER_AGENT_LOOKUP_TEST_LIVE

  if (live) {
    client = new UserAgentLookupSDK(merge([
      {
        apikey: env.USER_AGENT_LOOKUP_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.USER_AGENT_LOOKUP_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
