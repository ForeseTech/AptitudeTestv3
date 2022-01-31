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
    height: '70vh',
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
  formBtn: {
    width: '20rem',
    backgroundColor: '#000',
    color: 'white',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
    margin: '1rem 0',
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
      <Typography variant='h3' className={classes.title}>
        APTITUDE TEST
      </Typography>
      {error ? (
        <Message message={error} severity={'error'} isOpen={true} />
      ) : (
        ''
      )}
      <Grid container>
        <Grid item md={6} className={classes.formWrap}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              required
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
        <Grid item md={6}>
          <Typography variant='h6'>Instructions</Typography>
          <Typography className={classes.instruction} varaint='subtitle2'>
            <span>
              1. You will not be allowed to retake the test under any
              circumstances, hence please fill your details properly. No second
              chances will be given.
            </span>
            <br></br>
            <span>
              2. There are 50 questions on the test, each consiting of 4
              options, out of which only one is correct.<br></br>
              Questions 1-10 will test your quantitative ability.<br></br>
              Questions 11-20 will test your verbal reasoning.<br></br>
              Questions 21-30 will test your programming skills.<br></br>
              Questions 31-50 will test your core knowledge.<br></br>
            </span>
            <span>
              3. 1 point is granted for every correct answer. There is no
              negative marking.
            </span>
            <br></br>
            <span>4. All questions are compulsory.</span>
            <br></br>
            <span>
              5. The test will auto-submit at 5:10 (Non-Circuit Students) and at
              7:15 (Circuit Branch students)
            </span>
            <br></br>
            <span>
              6. You will be able to view the results of the test on the report
              generation portal in the first week of February
            </span>
            <br></br>
            <span>
              7. Your answers will be passed through a plagiarism checker and
              offenders will be reprimanded appropriately
            </span>
            <br></br>
            <span>
              8. Your answers will be lost on reloading the page. So, kindly
              refrain from reloading the page.
            </span>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginScreen;
