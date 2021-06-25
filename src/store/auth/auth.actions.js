import AuthTypes from "./auth.types";

/*Defining actions that are dispatched to the auth reducer
 */

export const requestLogin = () => {
    return {
        type: AuthTypes.LOGIN_REQUEST
    };
};

export const receiveLogin = (user) => {
    return {
        type: AuthTypes.LOGIN_SUCCESS,
        user
    };
};

export const loginError = error => {
    return {
        type: AuthTypes.LOGIN_FAILURE,
        error
    };
};

export const requestLogout = () => {
    return {
        type: AuthTypes.LOGOUT_REQUEST
    };
};

export const receiveLogout = () => {
    return {
        type: AuthTypes.LOGOUT_SUCCESS
    };
};

export const logoutError = error => {
    return {
        type: AuthTypes.LOGOUT_FAILURE,
        error
    };
};

export const requestSignUp = () => {
    return {
        type: AuthTypes.SIGN_UP_REQUEST
    };
};

export const receiveSignUp = (user) => {
    return {
        type: AuthTypes.SIGN_UP_SUCCESS,
        user
    };
};

export const SignUpError = error => {
    return {
        type: AuthTypes.SIGN_UP_FAILURE,
        error
    };
};

export const verifyRequest = () => {
    return {
        type: AuthTypes.VERIFY_REQUEST
    };
};

export const verifySuccess = () => {
    return {
        type: AuthTypes.VERIFY_SUCCESS
    };
};

export const verifyError = () => {
    return {
        type: AuthTypes.VERIFY_ERROR
    };
};

export const passwordResetRequest = () => {
    return {
        type: AuthTypes.RESET_PASSWORD_REQUEST
    }
};

export const passwordResetSuccess = () => {
    return {
        type: AuthTypes.RESET_PASSWORD_SUCCESS
    }
};

export const passwordResetError = (resettingErrorMessage) => {
    return {
        type: AuthTypes.RESET_PASSWORD_FAILURE,
        resettingErrorMessage
    }
};

