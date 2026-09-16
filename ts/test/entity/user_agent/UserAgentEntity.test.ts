

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UserAgentLookupSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('UserAgentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when USER_AGENT_LOOKUP_TEST_LIVE=TRUE.
  afterEach(liveDelay('USER_AGENT_LOOKUP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UserAgentLookupSDK.test()
    const ent = testsdk.UserAgent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.USER_AGENT_LOOKUP_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user_agent.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"browser","req":false,"short":"Browser name","type":"`$STRING`","index$":0},{"active":true,"name":"browserVersion","req":false,"short":"Browser version","type":"`$STRING`","index$":1},{"active":true,"name":"device","req":false,"short":"Device type","type":"`$STRING`","index$":2},{"active":true,"name":"os","req":false,"short":"Operating system name","type":"`$STRING`","index$":3},{"active":true,"name":"osVersion","req":false,"short":"Operating system version","type":"`$STRING`","index$":4},{"active":true,"name":"platform","req":false,"short":"Platform information","type":"`$STRING`","index$":5}],"name":"user_agent","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","kind":"query","name":"ua","orig":"ua","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /user-agent","json":"{\"operationId\":\"parseUserAgent\",\"parameters\":[{\"description\":\"The User Agent string to parse\",\"example\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\",\"in\":\"query\",\"name\":\"ua\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"browser\":\"Chrome\",\"browserVersion\":\"91.0.4472.124\",\"device\":\"Desktop\",\"os\":\"Windows\",\"osVersion\":\"10\",\"platform\":\"Windows\"},\"schema\":{\"properties\":{\"browser\":{\"description\":\"Browser name\",\"example\":\"Chrome\",\"type\":\"string\"},\"browserVersion\":{\"description\":\"Browser version\",\"example\":\"91.0.4472.124\",\"type\":\"string\"},\"device\":{\"description\":\"Device type\",\"example\":\"Desktop\",\"type\":\"string\"},\"os\":{\"description\":\"Operating system name\",\"example\":\"Windows\",\"type\":\"string\"},\"osVersion\":{\"description\":\"Operating system version\",\"example\":\"10\",\"type\":\"string\"},\"platform\":{\"description\":\"Platform information\",\"example\":\"Windows\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with parsed user agent information\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"User agent parameter is required\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - missing or invalid user agent parameter\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Internal server error\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/user-agent","segments":[{"lit":"user-agent"}],"select":{"exist":["ua"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"user_agent","name__orig":"user_agent","Name":"UserAgent","name_":"user_agent","name-":"user-agent","NAME":"USER_AGENT","index$":0}, {"active":true,"entity":"user_agent","key$":"BasicUserAgentFlow","kind":"basic","name":"BasicUserAgentFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"user_agent_ref01","srcdatavar":"user_agent_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_agent_ref01"}}],"index$":0}]}, 'UserAgent')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_agent_ref01_data = Object.values(setup.data.existing.user_agent)[0] as any

    // LOAD
    const user_agent_ref01_ent = client.UserAgent()
    const user_agent_ref01_match_dt0: any = {}
    const user_agent_ref01_data_dt0 = (await user_agent_ref01_ent.load(user_agent_ref01_match_dt0)).data()
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

  const env = envOverride({
    'USER_AGENT_LOOKUP_TEST_USER_AGENT_ENTID': idmap,
    'USER_AGENT_LOOKUP_TEST_LIVE': 'FALSE',
    'USER_AGENT_LOOKUP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['USER_AGENT_LOOKUP_TEST_USER_AGENT_ENTID']

  const live = 'TRUE' === env.USER_AGENT_LOOKUP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['USER_AGENT_LOOKUP_TEST_USER_AGENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UserAgentLookupSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
