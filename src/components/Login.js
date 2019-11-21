import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInOut } from '../actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StyleLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <StyleLink color="inherit" href="https://material-ui.com/">
      Bubble Tea Shop
    </StyleLink>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
}

const useStyles = makeStyles(theme => ({
'@global': {
  body: {
    backgroundColor: theme.palette.common.white,
  },
},
paper: {
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
},
avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
},
form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
},
submit: {
  margin: theme.spacing(3, 0, 2),
},
}
));

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false)
  const classes = useStyles();

  const dispatch = useDispatch();
  

  const handleClick = async (e) => {
    
    try {
      const res = await axios({
        method: "post",
        url: "/login",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          email: email,
          password: pass
        }
      })
      dispatch(logInOut({status: true, token: res.data.token}));
      setErr(false);
      history.push('/');

    } catch (error) {
      setErr(true)
    }
  } 

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={err}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="current-password"
            error={err}

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
            component={Button}
            onClick={handleClick}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <StyleLink variant="body2">
                Forgot password?
              </StyleLink>
            </Grid>
            <Grid item>
              <StyleLink component={Link} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </StyleLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;