package core

type UserAgentLookupError struct {
	IsUserAgentLookupError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUserAgentLookupError(code string, msg string, ctx *Context) *UserAgentLookupError {
	return &UserAgentLookupError{
		IsUserAgentLookupError: true,
		Sdk:              "UserAgentLookup",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UserAgentLookupError) Error() string {
	return e.Msg
}
