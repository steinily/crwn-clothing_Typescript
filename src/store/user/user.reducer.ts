import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import {
    signInFail,
    signUpFailed,
    signOutFailed,
    signOutSuccess,
    signInSuccess
} from './user.action'

export type UsersState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;

}

const INITIAL_STATE: UsersState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        }
    }

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null
        }
    }
    if (signOutFailed.match(action) || signInFail.match(action) || signUpFailed.match(action)) {
        return {
            ...state,
            error: action.payload
        }
    }



    return state;

}