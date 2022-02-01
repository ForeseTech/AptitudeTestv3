import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  TextField,
  Grid,
  Container,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { branches } from '../data';
import Message from '../components/Message';

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  textField: {
    width: '20rem',
    margin: '0.4rem',
  },
  formWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 0 4rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    margin: '0 0 2rem 0',
  },
  orderedList: {
    paddingLeft: '1.4rem',
  },
  formBtn: {
    width: '20rem',
    backgroundColor: '#000',
    color: 'white',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
    margin: '1.5rem 0',
  },
  instruction: {
    fontSize: '0.9rem',
    lineHeight: '1.7',
  },
});

const LoginScreen = ({ history }) => {
  const classes = useStyles();

  const [dept, setDept] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [regNo, setRegNo] = useState('');
  const isVolunteer = false;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (userInfo && userInfo.isVolunteer) {
      history.push('/volunteer/profile');
    } else if (userInfo && userInfo) {
      history.push('/test');
    } else if (adminInfo) {
      history.push('/admin/profile');
    }
  }, [userInfo, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(name, email, regNo, dept, isVolunteer));
  };

  return (
    <Container fixed className={classes.container}>
      <Typography variant='h4' className={classes.title}>
        APTITUDE TEST
      </Typography>
      {error ? (
        <Message message={error} severity={'error'} isOpen={true} />
      ) : (
        ''
      )}
      <Grid container>
        <Grid item md={4} className={classes.formWrap}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              required
              autoFocus
              className={classes.textField}
              label='Name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              variant='outlined'
              required
              className={classes.textField}
              label='Register Number'
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
            <TextField
              variant='outlined'
              required
              className={classes.textField}
              label='Email'
              value={email}
              email={true}
              onChange={(e) => setEmail(e.target.value)}
              helperText='Use your SVCE affiliated E-Mail ID only'
            />
            <TextField
              select
              variant='outlined'
              required
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
              type='submit'
            >
              BEGIN TEST
            </Button>
          </form>
        </Grid>
        <Grid item md={8}>
          <Typography variant='h6'>INSTRUCTIONS</Typography>
          <Typography className={classes.instruction} varaint='subtitle2'>
            <ol className={classes.orderedList}>
              <li>
                You will <b>not be allowed</b> to retake the test under any
                circumstances, hence please fill your details properly. No
                second chances will be given.
              </li>
              <li>
                There are <b>50</b> questions on the test, each consiting of{' '}
                <b>4</b> options, out of which only <b>one</b> is correct.
                <ul>
                  <li>
                    Questions <b>1-10</b> will test your{' '}
                    <b>quantitative ability</b>.
                  </li>
                  <li>
                    Questions <b>11-20</b> will test your{' '}
                    <b>verbal reasoning</b>.
                  </li>
                  <li>
                    Questions <b>21-30</b> will test your{' '}
                    <b>programming skills</b>.
                  </li>
                  <li>
                    Questions <b>31-50</b> will test your <b>core knowledge</b>.
                  </li>
                </ul>
              </li>
              <li>
                All question are <b>compulsory</b>.
              </li>
              <li>
                <b>1 point</b> is granted for every correct answer. There is no{' '}
                <b>negative marking</b>.
              </li>
              <li>
                The test will auto-submit at{' '}
                <b>5:10 P.M (Non-Circuit Branch Students)</b> and at{' '}
                <b>7:15 P.M (Circuit Branch Students)</b>.
              </li>
              <li>
                You will be able to view the results of the test on the report
                generation portal in the <b>second week of February</b>.
              </li>
              <li>
                Your answers will be passed through a <b>plagiarism checker</b>{' '}
                and offenders will be reprimanded appropriately.
              </li>
              <li>
                Your answers{' '}
                <b>
                  will be lost on reloading the page or logging out of the
                  software
                </b>
                .
              </li>
            </ol>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginScreen;
