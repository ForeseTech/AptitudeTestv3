import React from 'react';
import { Typography, makeStyles, Container } from '@material-ui/core';
import { Timer as TimerIcon } from '@material-ui/icons';
import TestForm from '../components/TestForm';
import UserTimer from '../components/UserTimer';

const useStyles = makeStyles({
  timer: {
    textAlign: 'center',
  },
  timerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ebfaff',
    color: '#00b3ff',
    margin: '0.7rem 0',
    padding: '0.4rem',
    borderRadius: '0.6rem',
  },
  timerText: {
    display: 'flex',
    alignItems: 'center',
  },
});

const TestScreen = ({ questions }) => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.timerHeader}>
        <div className={classes.timerText}>
          <Typography variant='h6'>Time Remaining</Typography>
        </div>
        <Typography variant='h6'>
          <UserTimer />
        </Typography>
      </div>
      <TestForm questions={questions} />
    </Container>
  );
};

export default TestScreen;
