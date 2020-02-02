import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  helper: {
    cursor: "pointer",
    color: "blue",
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      user: 'chef' password: 'chef'
    </Typography>
  );
}

const SignInAndSignUpPage = () => {
  const classes = useStyles();
  const [isNew, setIsNew] = useState(false);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {isNew ? <SignUp /> : <SignIn />}
      </div>
      <Grid container justify="flex-end">
        <Grid item onClick={e => setIsNew(isNew => !isNew)} className={classes.helper}>
          <Typography href="#" variant="body2">
            {isNew
              ?
              "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Typography>
        </Grid>
      </Grid>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignInAndSignUpPage;
