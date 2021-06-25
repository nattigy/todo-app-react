import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Navigation from "./component/navigation/navigation";
import PreLoader from "./component/preloader/preloader";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import ResetPassword from "./pages/auth/reset-password";

import "./assest/css/main_style.css";
import Today from "./pages/today/today";
import Daily from "./pages/daily/daily";
import CreateTask from "./pages/create-task/create-task";
import TaskDetail from "./pages/task-detail/task-detail";

/*Using styled component for the app container,
 content, positions and colors
 */
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

  /*If isLogged in undefined the app is still in loading state.
  Wait until the app is fully loaded and check the authentication state
  * */
  return isLoggedIn == null ? (
    <div className="bg-primary w-100 loading App">
      <PreLoader />
    </div>
  ) : (
    <div className={classes.container}>
      {isLoggedIn ? (
        /*Only allow access to these routes if the user is logged in
        if not redirect to sign in page
         */
        <div className="d-flex">
          <Router>
            <Navigation />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <div className="App">
                {/*Switch component enables us to render the routes in order*/}
                <Switch>
                  <Route exact path="/" render={() => <Redirect to="/today"/>}/>
                  <Route exact path="/today" component={Today}/>
                  <Route exact path="/daily" component={Daily}/>
                  <Route exact path="/add_task" component={CreateTask}/>
                  <Route exact path="/detail/:id" component={TaskDetail}/>
                  <Route exact path="/*" render={() => <Redirect to="/"/>} />
                </Switch>
              </div>
            </main>
          </Router>
        </div>
      ) : (
        /*Only access these routes if the user is logged in
        If not the internal implementation of the components will handle the redirect.
         */
        <Router>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
             <Route exact path="/signup" component={SignUp} />
             <Route exact path="/forgot-password" component={ResetPassword} />
            <Route exact path="/*" render={() => <Redirect to="/signin"/>} />
          </Switch>
        </Router>
      )}
    </div>
  );
};

/*States manged by redux can be globally access
Here we are mapping global states to the component as props
 */
const mapStateToProps = (state) => {
  return {
    loginError: state.auth.loginError,
    isLoggingIn: state.auth.isLoggingIn,
    isLoggedIn: state.auth.isLoggedIn,
    errorMessage: state.auth.errorMessage,
  };
};

//The connect higher order component connects the App component with the redux store
export default connect(mapStateToProps)(App);
