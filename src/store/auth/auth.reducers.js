import AuthTypes from "./auth.types";

const authReducers = (state = {}, action) => {
    switch (action.type) {
        case AuthTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                isLoggedIn: false,
                loginError: false
            };
        case AuthTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                loginError: false,
                user: action.user
            };
        case AuthTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false,
                loginError: true,
                errorMessage: action.error
            };
        case AuthTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                isLoggedOut: false,
                logoutError: false
            };
        case AuthTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isLoggedOut: true,
                isLoggedIn: false,
                logoutError: false,
                user: {}
            };
        case AuthTypes.LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true,
                errorMessage: action.error
            };
        case AuthTypes.SIGN_UP_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false
            };
        case AuthTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoggingIn: false,
                user: action.user
            };
        case AuthTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false,
                signUpError: true,
                errorMessage: action.error
            };
        case AuthTypes.VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            };
        case AuthTypes.VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false,
                isVerified: true
            };
        case AuthTypes.VERIFY_ERROR:
            return {
                ...state,
                isLoggedIn: false,
            };
        case AuthTypes.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isResetting: true,
                resettingDone: false,
                resettingError: false
            };
        case AuthTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetting: false,
                resettingDone: true,
                resettingError: false
            };
        case AuthTypes.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isResetting: false,
                resettingDone: false,
                resettingError: true,
                resettingErrorMessage: action.resettingErrorMessage
            };
        default:
            return state;
    }
};

export default authReducers;