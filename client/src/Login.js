import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={emailError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={emailError ? "Required" : ""}
            onChange={(e) => {
              if (e.target.value === "") {
                setEmailError(true);
              } else {
                setEmailError(false);
                setEmail(e.target.value);
              }
            }}
            onBlur={() => {
              if (email === "") {
                setEmailError(true);
              }
            }}
            autoFocus
          />
          <TextField
            error={passwordError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            helperText={passwordError ? "Required" : ""}
            onChange={(e) => {
              if (e.target.value === "") {
                setPasswordError(true);
              } else {
                setPasswordError(false);
                setPassword(e.target.value);
              }
            }}
            onBlur={() => {
              if (password === "") {
                setPasswordError(true);
              }
            }}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (email && password) {
                axios.create({ baseURL: window.location.origin });
                axios
                  .post("/api/user/login", {
                    email,
                    password,
                  })
                  .then(function (response) {
                    console.log(response);
                    localStorage.setItem("user_id", email);
                    history.push("/schedule");
                  })
                  .catch(function (error) {
                    console.log(error);
                    if (
                      error.message === "Request failed with status code 401"
                    ) {
                      setErrorMessage("Wrong email/password.");
                      setAuthError(true);
                      setEmailError(true);
                      setPassword(true);
                    } else {
                      setErrorMessage("An error occured. Please try again.");
                    }
                  });
              } else {
                setErrorMessage("Please fill all required fields.");
                setAuthError(true);
              }
            }}
          >
            Sign In
          </Button>
          <Dialog
            open={authError}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setAuthError(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Error"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAuthError(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => history.push("/register")}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
