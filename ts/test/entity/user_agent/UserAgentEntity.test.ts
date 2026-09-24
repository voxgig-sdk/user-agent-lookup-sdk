

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser":{"a":true,"h":"Browser","n":"browser","r":false,"sh":"Browser name","t":"`$STRING`","key$":"browser","index$":0},"browserVersion":{"a":true,"h":"Browser Version","n":"browserVersion","r":false,"sh":"Browser version","t":"`$STRING`","key$":"browserVersion","index$":1},"device":{"a":true,"h":"Device","n":"device","r":false,"sh":"Device type","t":"`$STRING`","key$":"device","index$":2},"os":{"a":true,"h":"Os","n":"os","r":false,"sh":"Operating system name","t":"`$STRING`","key$":"os","index$":3},"osVersion":{"a":true,"h":"Os Version","n":"osVersion","r":false,"sh":"Operating system version","t":"`$STRING`","key$":"osVersion","index$":4},"platform":{"a":true,"h":"Platform","n":"platform","r":false,"sh":"Platform information","t":"`$STRING`","key$":"platform","index$":5}},"name":"user_agent","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /user-agent","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","k":"query","n":"ua","or":"ua","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/user-agent","q":{"exist":["ua"]},"r":{},"s":[{"lit":"user-agent"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"user_agent","name__orig":"user_agent","Name":"UserAgent","name_":"user_agent","name-":"user-agent","NAME":"USER_AGENT","index$":0}, {"active":true,"entity":"user_agent","key$":"BasicUserAgentFlow","kind":"basic","name":"BasicUserAgentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"user_agent_ref01","srcdatavar":"user_agent_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_agent_ref01"}}],"index$":0}]}, 'UserAgent', {"GET /user-agent":{"protocol":"http","operationId":"parseUserAgent","responses":{"200":{"description":"Successful response with parsed user agent information","content":{"application/json":{"schema":{"type":"object","properties":{"browser":{"description":"Browser name","example":"Chrome","key$":"browser","type":"string"},"browserVersion":{"description":"Browser version","example":"91.0.4472.124","key$":"browserVersion","type":"string"},"os":{"description":"Operating system name","example":"Windows","key$":"os","type":"string"},"osVersion":{"description":"Operating system version","example":"10","key$":"osVersion","type":"string"},"device":{"description":"Device type","example":"Desktop","key$":"device","type":"string"},"platform":{"description":"Platform information","example":"Windows","key$":"platform","type":"string"}},"index$":0},"example":{"browser":"Chrome","browserVersion":"91.0.4472.124","os":"Windows","osVersion":"10","device":"Desktop","platform":"Windows"}}}},"400":{"description":"Bad request - missing or invalid user agent parameter","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}},"example":{"error":"User agent parameter is required"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}},"example":{"error":"Internal server error"}}}}},"parameters":[{"name":"ua","in":"query","description":"The User Agent string to parse","required":true,"schema":{"type":"string"},"example":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36","index$":0}],"securitySource":"unspecified"}})
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
  
