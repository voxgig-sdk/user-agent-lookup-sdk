# UserAgentLookup SDK utility: make_context

from core.context import UserAgentLookupContext


def make_context_util(ctxmap, basectx):
    return UserAgentLookupContext(ctxmap, basectx)
