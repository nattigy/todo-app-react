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

//Login
export const loginUser = user => dispatch => {
  //Dispatch requestLogin to the auth reducer to stared the login
  dispatch(requestLogin());
  /*Set session (Persistence.SESSION) the session will stay for a long time
  even if the tab is closed
   */
  fbConfig.auth().setPersistence(fbConfig.auth.Auth.Persistence.SESSION)
    .then(() => {
      //return the authenticated user to the next handler
      return fbConfig.auth().signInWithEmailAndPassword(user.email.toString().trim(), user.password)
    })
    .then(async user => {
      //Get user with this firebase id from mongodb
      let result = await getUser({firebaseID: user.user.uid})

      if (result) {
        if (result.error) {
          //Dispatch verifyError to the auth reducer if the login was unsuccessful
          dispatch(verifyError());
        } else {
          //Dispatch receiveLogin to the auth reducer if the login was successful
          dispatch(receiveLogin(result));
        }
      } else {
        //Dispatch receiveLogin to the auth reducer if the login was successful
        dispatch(receiveLogin(user.user));
      }
    })
    //Dispatch loginError to the auth reducer if the login was unsuccessful
    .catch(error => dispatch(loginError(error)));
};

//Logout the current user
export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  fbConfig.auth()
    .signOut()
    //Dispatch receiveLogout to the auth reducer id logout was successful
    .then(() => dispatch(receiveLogout()))
    .catch(error => dispatch(logoutError(error)));
};

//User registration or signup using email and password to firebase
export const registerUser = ({email, password}) => dispatch => {
  dispatch(requestSignUp());
  fbConfig.auth()
    .createUserWithEmailAndPassword(email, password)
    //Dispatch receiveSignUp to the auth reducer if sign up was successful
    .then(res => dispatch(receiveSignUp(res.user)))
    .catch(error => dispatch(SignUpError(error)));
};

//Check if there is a logged in user on every page refresh and redirect
export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  fbConfig.auth()
    .onAuthStateChanged(async user => {
      if (user !== null) {
        //if a user exists then fetch the authenticated user data from mongodb
        let result = await getUser({firebaseID: user.uid})

        if (result) {
          if (result.error) {
            //If no user found return error
            dispatch(verifyError());
          } else {
            //Dispatch receiveLogin to the auth reducer if the user was found on mongodb
            dispatch(receiveLogin(result));
          }
        } else {
          dispatch(receiveLogin(user));
        }
      } else {
        //If no user found return error
        dispatch(verifyError());
      }
      //Confirm the verification was successful
      dispatch(verifySuccess());
    });
};

//request to reset users password the email will be sent from firebase
export const resetPassword = ({email}) => dispatch => {
  dispatch(passwordResetRequest())
  fbConfig.auth().sendPasswordResetEmail(email)
    .then(() => dispatch(passwordResetSuccess()))
    .catch(e => dispatch(passwordResetError(e.message)));
}

//Get the requested user from mongodb using the firebase id
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
      //parse the result and return the user data
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