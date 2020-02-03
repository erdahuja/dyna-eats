import React, { useState } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";
import { auth } from "../../firebase/firebase.utils";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    color: "red"
  }
}));

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const classes = useStyles();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      console.error("sign in error");
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {isLoading ? (
        <SpinnerOverlay>
          <SpinnerContainer />
        </SpinnerOverlay>
      ) : (
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            label="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            label="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <FormHelperText className={classes.error}>
            {error ? error.message : null}
          </FormHelperText>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      )}
    </>
  );
};

export default SignIn;
