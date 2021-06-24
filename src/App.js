import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

// import Navigation from "./component/navigation/navigation";
// import PreLoader from "./component/preloader/preloader";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";

import "./main.css";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#121212",
    height: "100vh",
    position: "fixed",
    overflowY: "scroll",
    width: "100%",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: "hidden",
    height: "100%",
    color: "#fff",
  },
}));

const App = (props) => {
  const { isLoggedIn } = props;
  const classes = useStyles();

  return isLoggedIn == null ? (
    <div className="bg-primary w-100 loading App">
      {/*<PreLoader />*/}
    </div>
  ) : (
    <div className={classes.container}>
      {isLoggedIn ? (
        <div className="d-flex">
          <Router>
            {/*<Navigation />*/}
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <div className="App">
                <Switch>
                  <Route exact path="/" render={() => <div>Home</div>} />
                </Switch>
              </div>
            </main>
          </Router>
        </div>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
             <Route exact path="/signup" component={SignUp} />
            <Route exact path="/*" component={SignIn} />
          </Switch>
        </Router>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginError: state.auth.loginError,
    isLoggingIn: state.auth.isLoggingIn,
    isLoggedIn: state.auth.isLoggedIn,
    errorMessage: state.auth.errorMessage,
  };
};

export default connect(mapStateToProps)(App);
