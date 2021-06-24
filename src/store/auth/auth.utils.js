import fbConfig from "../../firebase/fb-config";

import {
    loginError,
    logoutError,
    receiveLogin,
    receiveLogout,
    receiveSignUp,
    requestLogin,
    requestLogout,
    requestSignUp,
    SignUpError,
    verifyError,
    verifyRequest,
    verifySuccess,
    passwordResetRequest,
    passwordResetSuccess,
    passwordResetError
} from "./auth.actions";

export const loginUser = user => dispatch => {
    dispatch(requestLogin());
    fbConfig.auth().setPersistence(fbConfig.auth.Auth.Persistence.SESSION)
        .then(() => {
            return fbConfig.auth().signInWithEmailAndPassword(user.email.toString().trim(), user.password)
        })
        .then(user => {
            let authUser = user.user;
            //fetch user data from mongo and return the value
          return authUser
        })
        .then(newUser => dispatch(receiveLogin(newUser)))
        .catch(error => dispatch(loginError(error)));
};

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    fbConfig.auth()
        .signOut()
        .then(() => dispatch(receiveLogout()))
        .catch(error => dispatch(logoutError(error)));
};

export const registerUser = ({ email, password, firstName, middleName, lastName }) => dispatch => {
    dispatch(requestSignUp());
    fbConfig.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            // register the new user on mongodb
        }).catch(error => dispatch(SignUpError(error)));
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    fbConfig.auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                //if a user already have a session stored fetch the user data from api
            } else {
                dispatch(verifyError())
            }
            dispatch(verifySuccess());
        });
};

export const resetPassword = ({ email }) => dispatch => {
    dispatch(passwordResetRequest())
    fbConfig.auth().sendPasswordResetEmail(email)
        .then(() => dispatch(passwordResetSuccess()))
        .catch(e => dispatch(passwordResetError(e.message)));
}