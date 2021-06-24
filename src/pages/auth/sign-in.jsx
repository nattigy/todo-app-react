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

import {loginUser} from "../../store/auth/auth.utils";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    loginError,
    isLoggedIn,
    errorMessage,
    isLoggingIn,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn({ email, password });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <Dialog open={true}>
        <form onSubmit={handleSubmit}>
          {isLoggingIn ? (
            <div className="position-relative px-3 py-2">
              <CircularProgress />
            </div>
          ) : (
            <Paper className="DDD">
              <Avatar className="avatar" component="div">
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className="text-white">
                Sign In
              </Typography>
              <TextField
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                autoFocus
                className="my-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              {loginError && (
                <Typography component="p" className="errorText small">
                  {errorMessage.message}
                </Typography>
              )}
              <button
                type="submit"
                style={{ width: "100%" }}
                className="btn-custom my-3 btn"
              >
                Sign In
              </button>
              <div className="d-flex w-100 small">
                <Link className="text-left text-nowrap" to="/forgot-password">
                  Forgot Password?
                </Link>
                <Link to="/signup" className="text-nowrap text-right w-100">
                  Don't have an account
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
    loginError: state.auth.loginError,
    isLoggingIn: state.auth.isLoggingIn,
    isLoggedIn: state.auth.isLoggedIn,
    errorMessage: state.auth.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (newUser) => dispatch(loginUser(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
