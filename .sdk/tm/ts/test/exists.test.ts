
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UserAgentLookupSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UserAgentLookupSDK.test()
    equal(null !== testsdk, true)
  })

})
