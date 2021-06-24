import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Avatar,
  TextField,
  Typography,
  Paper,
  Dialog,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { registerUser } from "../../store/auth/auth.utils";
import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../../apollo/mutations/user-mutation";
import {receiveLogin} from "../../store/auth/auth.actions";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(true);

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const {
    signUpError,
    isLoggedIn,
    user,
    errorMessage,
    isLoggingIn,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordMismatch)
      props.signUp({ email, password })
  };

  useEffect(()=>{
    if(user)
      createUser({
        variables: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          email: email,
          firebaseId: user.uid,
        }
      }).then(res => {
        let result = res.data["userCreateOne"]["record"]
        props.signIn({
          ...result
        })
      })
  },[user])

  if (data || isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <Dialog open={true}>
        <form onSubmit={handleSubmit} className="">
          {isLoggingIn || loading ? (
            <div className="position-relative px-3 py-2">
              <CircularProgress />
            </div>
          ) : (
            <Paper className="DDD">
              <Avatar className="avatar" component="div">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className="text-white">
                Sign Up
              </Typography>
              <TextField
                required
                fullWidth
                autoFocus
                id="email"
                label="Email address"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="my-2"
              />
              <TextField
                required
                fullWidth
                id="firstName"
                value={firstName}
                label="First Name"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                className="my-2"
              />
              <TextField
                required
                fullWidth
                id="middleName"
                label="Middle Name"
                value={middleName}
                name="middleName"
                onChange={(e) => setMiddleName(e.target.value)}
                className="my-2"
              />
              <TextField
                required
                fullWidth
                id="lastName"
                value={lastName}
                label="Last Name"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                className="my-2"
              />
              <TextField
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="my-2"
              />
              <TextField
                required
                fullWidth
                name="rePassword"
                label="Re-enter Password"
                type="password"
                id="rePassword"
                onChange={(e) =>
                  setPasswordMismatch(e.target.value === password)
                }
                className="my-2 text-nowrap"
              />
              {!passwordMismatch && (
                <Typography component="p" className="errorText small">
                  Password doesn't match
                </Typography>
              )}
              {signUpError && (
                <Typography component="p" className="errorText small">
                  {errorMessage.message}
                </Typography>
              )}
              {error && (
                <Typography component="p" className="errorText small">
                  {error.message}
                </Typography>
              )}
              <button
                type="submit"
                style={{ width: "100%" }}
                className="btn-custom my-3 btn"
              >
                Sign Up
              </button>
              <div className="small">
                <Link to="/signin" variant="body2">
                  Already have an account?
                </Link>
              </div>
            </Paper>
          )}
        </form>
      </Dialog>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    signUpError: state.auth.signUpError,
    isLoggingIn: state.auth.isLoggingIn,
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    errorMessage: state.auth.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(registerUser(newUser)),
    signIn: (newUser) => dispatch(receiveLogin(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
