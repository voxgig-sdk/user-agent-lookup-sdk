
import { Context } from './Context'


class UserAgentLookupError extends Error {

  isUserAgentLookupError = true

  sdk = 'UserAgentLookup'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UserAgentLookupError
}

