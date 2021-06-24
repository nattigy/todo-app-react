import fbConfig from "../../firebase/fb-config";

import {
  loginError,
  logoutError,
  passwordResetError,
  passwordResetRequest,
  passwordResetSuccess, receiveLogin,
  receiveLogout,
  receiveSignUp,
  requestLogin,
  requestLogout,
  requestSignUp,
  SignUpError,
  verifyError,
  verifyRequest,
  verifySuccess
} from "./auth.actions";
import {GET_USER} from "../../apollo/queries/user-queries";

export const loginUser = user => dispatch => {
  dispatch(requestLogin());
  fbConfig.auth().setPersistence(fbConfig.auth.Auth.Persistence.SESSION)
    .then(() => {
      return fbConfig.auth().signInWithEmailAndPassword(user.email.toString().trim(), user.password)
    })
    .then(async user => {
      let result = await getUser({firebaseID: user.user.uid})

      if (result) {
        if (result.error) {
          dispatch(verifyError());
        } else {
          dispatch(receiveLogin(result));
        }
      } else {
        dispatch(receiveLogin(user.user));
      }
    })
    .catch(error => dispatch(loginError(error)));
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  fbConfig.auth()
    .signOut()
    .then(() => dispatch(receiveLogout()))
    .catch(error => dispatch(logoutError(error)));
};

export const registerUser = ({email, password}) => dispatch => {
  dispatch(requestSignUp());
  fbConfig.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => dispatch(receiveSignUp(res.user)))
    .catch(error => dispatch(SignUpError(error)));
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  fbConfig.auth()
    .onAuthStateChanged(async user => {
      if (user !== null) {
        let result = await getUser({firebaseID: user.uid})

        if (result) {
          if (result.error) {
            dispatch(verifyError());
          } else {
            dispatch(receiveLogin(result));
          }
        } else {
          dispatch(receiveLogin(user));
        }
      } else {
        dispatch(verifyError());
      }
      dispatch(verifySuccess());
    });
};

export const resetPassword = ({email}) => dispatch => {
  dispatch(passwordResetRequest())
  fbConfig.auth().sendPasswordResetEmail(email)
    .then(() => dispatch(passwordResetSuccess()))
    .catch(e => dispatch(passwordResetError(e.message)));
}

const getUser = async ({firebaseID}) => {
  let result = null;
  await fetch('https://frozen-oasis-35227.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_USER,
      variables: {
        firebaseId: firebaseID
      },
    }),
  })
    .then(res => res.json())
    .then((res) => {
      if (res.data['userOne'] !== null) {
        result = res.data['userOne'];
      } else {
        result = null
      }
    })
    .catch((error) => {
      result = {error}
    });

  return result
}