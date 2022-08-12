
import { createAction, withMatcher, Action, ActionWhitPayload } from '../../utils/reducer/reducer.utils'
import { USER_ACTION_TYPES } from "./user.types";
import { UserData, AdditionalInformation } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';


export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export type SetCurrentUser = ActionWhitPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export type EmailSignInstart = ActionWhitPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email: string, password: string }>
export type SignInSuccess = ActionWhitPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>
export type SignInFail = ActionWhitPayload<USER_ACTION_TYPES.SING_IN_FAILURE, Error>;
export type SignOutFailed = ActionWhitPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>;
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignUpFailed = ActionWhitPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>;
export type SignUpStart = ActionWhitPayload<USER_ACTION_TYPES.SIGN_UP_START, { email: string, password: string, displayName: string }>
export type SignUpSuccess = ActionWhitPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, { user: User, additionalInformation: AdditionalInformation }>

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => { return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); })

export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION))

export const googleSingInStart = withMatcher(() => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START))

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInstart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }))

export const signInSuccess = withMatcher((user: UserData & {id : string}): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user))

export const signInFail = withMatcher((error: Error) => createAction(USER_ACTION_TYPES.SING_IN_FAILURE, error))

export const signUpStart = withMatcher((email: string, password: string, displayName: string) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName }))

export const signUpSuccess = withMatcher((user: User, additionalInformation: AdditionalInformation) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInformation }))

export const signUpFailed = withMatcher((error: Error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error))

export const signOutStart = withMatcher(() => createAction(USER_ACTION_TYPES.SIGN_OUT_START))

export const signOutSuccess = withMatcher(() => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS))

export const signOutFailed = withMatcher((error: Error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error))