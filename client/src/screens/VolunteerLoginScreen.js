import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Container,
  MenuItem,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { branches } from '../data';

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '70vh',
  },
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  textField: {
    width: '20rem',
    margin: '0.4rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formBtn: {
    fontFamily: "'Andada Pro', serif",
    width: '20rem',
    backgroundColor: '#150050',
    '&:hover, &:focus': {
      backgroundColor: '#1f0075',
    },
  },
  title: {
    fontFamily: "'Andada Pro', serif",
    fontWeight: '500',
  },
});

const VolunteerLoginScreen = ({ history }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [regNo, setRegNo] = useState('');

  const isVolunteer = true;
  const email = null;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isVolunteer) {
      history.push('/volunteer/profile');
    } else if (userInfo && !userInfo.isVolunteer) {
      history.push('/');
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(name, email, regNo, dept, isVolunteer));
  };

  return (
    <Container fixed className={classes.container}>
      <Typography className={classes.title} variant='h4'>
        Forese Volunteer
      </Typography>
      <Grid container className={classes.root}>
        <Grid item md={12}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              className={classes.textField}
              label='Name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              variant='outlined'
              className={classes.textField}
              label='Register Number'
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
            <TextField
              select
              variant='outlined'
              className={classes.textField}
              label='Branch'
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            >
              {branches.map((e) => (
                <MenuItem key={e.id} value={e.value}>
                  {e.value}
                </MenuItem>
              ))}
            </TextField>
            <Button
              className={classes.formBtn}
              variant='contained'
              color='primary'
              type='submit'
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VolunteerLoginScreen;
