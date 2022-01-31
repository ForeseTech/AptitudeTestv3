import React, { useState, useEffect } from 'react';
import {
  TextField,
  Container,
  Grid,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../actions/adminActions';
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
});

const AdminLoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);

  const { loading, error, adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      history.push('/admin/profile');
    }
  }, [history, adminInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(email, password));
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
      {error ? (
        <Message message={error} severity={'error'} isOpen={true} />
      ) : (
        ''
      )}
      <Grid container md={12} className={classes.container}>
        <Grid item>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              className={classes.textField}
              label='email'
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
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminLoginScreen;
