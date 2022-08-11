import { takeLatest , put , all , call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { 
    signInSuccess,
    signInFail, 
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
 } from './user.action';

import {getCurrentUser ,
     createUserDocumentFromAuth ,
     signInWithGooglePopup,
     signInAuthUserWithEmailAndPassword,
     createAuthUserWithEmailAndPassword,
     signOutUser
     } from  '../../utils/firebase/firebase.utils'


export function* getSnapshotFromUserAuth(userAuth,additionalInformation){
    try{
            const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation);
            console.log(userSnapShot)
        yield put(signInSuccess({ id:userSnapShot.id, ...userSnapShot.data()}));
        
    }catch(error){
        yield put(signInFail(error))

    }
}

export function* isUserAuth() {
    try {
        const userAuth = yield(getCurrentUser)
        if(userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch(error) {
        yield put(signInFail(error))
    }
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuth)
}




export function* signInWhitGoogle() {
    try{
       const {user} = yield call(signInWithGooglePopup)
       yield call(getSnapshotFromUserAuth,user);
    }catch(error){
        yield put(signInFail(error))
    }
}

export function* onGoogleSingInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWhitGoogle)
}

export function* signInWhitEmail({payload : {email,password}}) {
    try{
        const {user} = yield call(
            signInAuthUserWithEmailAndPassword,email,password
        );
    yield call(getSnapshotFromUserAuth, user);

    }catch(error){
        yield put(signInFail(error))
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START , signInWhitEmail)
}


export function* signUp({payload: {email , password , displayName }}) {
    try{
        const { user } = yield call(createAuthUserWithEmailAndPassword, email,password)
        yield put(signUpSuccess(user , {displayName}))
    }catch(error){
        yield put(signUpFailed(error))
    }
}

export function* signInAfterSignUp({payload:{user , additionalInformation} }){
    yield call(getSnapshotFromUserAuth,user,additionalInformation);

}


export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSigUpStart() {
    yield takeLatest(
        USER_ACTION_TYPES.SIGN_UP_START,signUp
    )
}


export function* signOut() {
    try{
        yield call(signOutUser);
        yield put(signOutSuccess())
    }catch(error){
        yield put(signOutFailed(error))
    }
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}









    export  function* userSagas() {
        yield all([
            call(onCheckUserSession),
            call(signInWhitGoogle) ,
            call(onEmailSignInStart),
            call(onSigUpStart),
            call(onSignUpSuccess),
            call(onSignOutStart)
            ])
    }