
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UserAgentLookupSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = UserAgentLookupSDK.test()
    equal(testsdk instanceof UserAgentLookupSDK, true,
      'UserAgentLookupSDK.test() must return a client synchronously')
  })

})
