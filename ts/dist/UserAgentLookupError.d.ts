import { Context } from './Context';
declare class UserAgentLookupError extends Error {
    isUserAgentLookupError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { UserAgentLookupError };
