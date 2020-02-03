import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  point: {
    cursor: "pointer"
  }
}));

const Header = ({ currentUser }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Link to="/">
            <Logo />
          </Link>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Dyno Eats
        </Typography>
        {currentUser ? (
          <>
          <Typography variant="h6" className={classes.title}>
            User: {currentUser.name}
          </Typography>
                      <Button
                      className={classes.point}
                      onClick={() => auth.signOut()}
                      color="inherit"
                    >
                      Logout
                    </Button>
                    </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);
