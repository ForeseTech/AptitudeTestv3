import React, { useState, useEffect } from 'react';
import {
  TextField,
  Container,
  Grid,
  makeStyles,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  IconButton,
  InputLabel,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin } from '../actions/adminActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    padding: '2rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    margin: '0.5rem 0',
  },
  submitBtn: {
    margin: '1rem 0',
  },
});

const AdminRegisterScreen = ({ history }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(false);
  const [showPassword, setShowPassword] = useState('false');

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { loading, adminInfo } = adminLogin;

  const adminRegister = useSelector((state) => state.adminRegister);
  const { error } = adminRegister;

  useEffect(() => {
    if (adminInfo) {
      history.push('/admin/profile');
    }
  }, [history, adminInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    } else {
      dispatch(registerAdmin(userName, email, password));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {message ? (
        <Message
          message={'passwords do not match'}
          severity={'error'}
          isOpen={true}
        />
      ) : null}
      {error ? (
        <Message message={error} severity={'error'} isOpen={true} />
      ) : null}
      {loading && <Loader />}
      <Grid container md={12} className={classes.container}>
        <Grid item>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              className={classes.textField}
              label='Username'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              variant='outlined'
              className={classes.textField}
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl className={classes.textField} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'password' : 'text'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
            <FormControl className={classes.textField} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'password' : 'text'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Confirm Password'
              />
            </FormControl>
            <Button
              variant='contained'
              type='submit'
              className={classes.submitBtn}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminRegisterScreen;
