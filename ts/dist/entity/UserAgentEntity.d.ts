import { UserAgentLookupEntityBase } from '../UserAgentLookupEntityBase';
import type { UserAgentLookupSDK } from '../UserAgentLookupSDK';
import type { Control } from '../types';
import type { UserAgent, UserAgentLoadMatch } from '../UserAgentLookupTypes';
declare class UserAgentEntity extends UserAgentLookupEntityBase<UserAgent> {
    constructor(client: UserAgentLookupSDK, entopts: any);
    make(this: UserAgentEntity): UserAgentEntity;
    load(this: any, reqmatch?: UserAgentLoadMatch, ctrl?: Control): Promise<UserAgentEntity>;
}
export { UserAgentEntity };
