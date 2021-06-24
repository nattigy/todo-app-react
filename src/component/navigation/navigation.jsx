import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Add, Today, WbSunny} from "@material-ui/icons";
import {logoutUser} from "../../store/auth/auth.utils";
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

import SignIn from "../../pages/auth/sign-in";
import PreLoader from "../preloader/preloader";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#333",
  },
  homeLink: {
    color: "#fff",
    "&:hover": {
      backgroundColor: "#333",
    },
    textDecoration: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#2d2d2d",
  },
  title: {
    flexGrow: 1,
  },
}));

function Navigation(props) {
  const {window, isLoggedIn, user} = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Fragment>
      <div className="d-flex px-2 py-3">
        <div>
          <Avatar/>
        </div>
        <div className="text-white pl-2">
          <p className="mb-1">{`${user.firstName} ${user.middleName}`}</p>
          <p className="mb-1">{user.email}</p>
        </div>
      </div>
      <Divider/>
      <NavLink
        className="listItem"
        to="/today"
      >
        <ListItem button className="listItem py-4">
          <ListItemIcon><WbSunny className="listIcons"/></ListItemIcon>
          <ListItemText primary="Today" className="text-white"/>
        </ListItem>
      </NavLink>
      <Divider/>
      <NavLink
        className="listItem"
        to="/daily"
      >
        <ListItem button className="listItem py-4">
          <ListItemIcon><Today className="listIcons"/></ListItemIcon>
          <ListItemText primary="Daily" className="text-white"/>
        </ListItem>
      </NavLink>
      <Divider/>
      <NavLink
        className="listItem"
        to="/add_task"
      >
        <ListItem button className="listItem py-4">
          <ListItemIcon><Add className="listIcons"/></ListItemIcon>
          <ListItemText primary="Add Task" className="text-white"/>
        </ListItem>
      </NavLink>
      <Divider/>
      <div className={classes.toolbar}/>
    </Fragment>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (isLoggedIn === undefined) {
    return <PreLoader/>;
  } else if (isLoggedIn === false) {
    return <SignIn/>;
  } else {
    return (
      <Fragment>
        <CssBaseline/>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <NavLink className={classes.homeLink} to="/">
                Todo App
              </NavLink>
            </Typography>
            <Typography className="small pr-2">
              {user.displayName}
            </Typography>
            <Button color="primary" variant="contained" onClick={() => props.signOut()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
