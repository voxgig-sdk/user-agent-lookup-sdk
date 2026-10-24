import { UserAgentEntity } from './entity/UserAgentEntity';
export type * from './UserAgentLookupTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { UserAgentLookupEntityBase } from './UserAgentLookupEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class UserAgentLookupSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    UserAgent(entopts?: Record<string, any>): UserAgentEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): UserAgentLookupSDK;
    tester(testopts?: any, sdkopts?: any): UserAgentLookupSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof UserAgentLookupSDK;
export { stdutil, config, BaseFeature, UserAgentLookupEntityBase, UserAgentLookupSDK, SDK, };
export type { DirectResult };
