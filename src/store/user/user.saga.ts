import { takeLatest , put , all , call } from 'typed-redux-saga/macro';

import { USER_ACTION_TYPES } from './user.types';

import { 
    signInSuccess,
    signInFail, 
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
    EmailSignInstart,
    SignUpStart,
    SignUpSuccess
 } from './user.action';

import {getCurrentUser ,
     createUserDocumentFromAuth ,
     signInWithGooglePopup,
     signInAuthUserWithEmailAndPassword,
     createAuthUserWithEmailAndPassword,
     signOutUser,
     AdditionalInformation
     } from  '../../utils/firebase/firebase.utils'

import { User } from 'firebase/auth';




export function* getSnapshotFromUserAuth(userAuth: User ,additionalInformation?: AdditionalInformation){
    try{
        const userSnapShot = yield* call(createUserDocumentFromAuth, userAuth, additionalInformation);
           
        if(userSnapShot){
        yield* put(signInSuccess({ id:userSnapShot.id, ...userSnapShot.data()}));
        }
    }catch(error){
        yield* put(signInFail(error as Error))

    }
}

export function* isUserAuth() {
    try {
        const userAuth = yield* call(getCurrentUser)
        if(!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch(error) {
        yield* put(signInFail(error as Error))
    }
}

export function* onCheckUserSession(){
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth)
}




export function* signInWhitGoogle() {
    try{
       const {user} = yield* call(signInWithGooglePopup)
       yield* call(getSnapshotFromUserAuth,user);
    }catch(error){
        yield* put(signInFail(error as Error))
    }
}

export function* onGoogleSingInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWhitGoogle)
}

export function* signInWhitEmail({payload : {email,password}} :EmailSignInstart) {
    try{
        const userCredential = yield* call(
            signInAuthUserWithEmailAndPassword,email,password
        );

    if(userCredential){
        const {user} = userCredential
        yield* call(getSnapshotFromUserAuth, user);
    }

    

    }catch(error){
        yield* put(signInFail(error as Error))
    }
}

export function* onEmailSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START , signInWhitEmail)
}


export function* signUp({payload: {email , password , displayName }} : SignUpStart) {
    try{
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email,password)
       
        if(userCredential){
            const {user} =userCredential
            yield* put(signUpSuccess(user , {displayName}))
        }
    }catch(error){
        yield* put(signUpFailed(error as Error))
    }
}

export function* signInAfterSignUp({payload:{user , additionalInformation} } : SignUpSuccess){
    yield* call(getSnapshotFromUserAuth,user,additionalInformation);

}


export function* onSignUpSuccess(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSigUpStart() {
    yield* takeLatest(
        USER_ACTION_TYPES.SIGN_UP_START,signUp
    )
}


export function* signOut() {
    try{
        yield* call(signOutUser);
        yield* put(signOutSuccess())
    }catch(error){
        yield* put(signOutFailed(error as Error))
    }
}

export function* onSignOutStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}









    export  function* userSagas() {
        yield* all([
            call(onCheckUserSession),
            call(signInWhitGoogle) ,
            call(onEmailSignInStart),
            call(onSigUpStart),
            call(onSignUpSuccess),
            call(onSignOutStart)
            ])
    }