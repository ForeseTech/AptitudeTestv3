import React, { useEffect, useState } from 'react';
import { Container, makeStyles, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAnswerKey } from '../actions/userActions';
import AnswerKeyCard from '../components/AnswerKeyCard';
import Loader from '../components/Loader';
import axios from 'axios';
import WaitScreen from './WaitScreen';

const useStyles = makeStyles({
  title: {
    padding: '2rem 0 1rem 0',
  },
  answerkeyWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const UserAnswerScreen = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [endTime, setEndTime] = useState();

  const userResult = useSelector((state) => state.answerkey);
  const { error, loading, answerkey } = userResult;

  useEffect(() => {
    dispatch(getAnswerKey());
    getTimerStatus();
  }, []);

  const getTimerStatus = async () => {
    const { data } = await axios.get('/api/timer/');
    setEndTime(data[0].testCompleted);
  };

  return (
    <Container>
      <Grid container>
        {loading ? (
          <Loader />
        ) : endTime ? (
          <Grid item className={classes.answerkeyWrap}>
            {answerkey && (
              <div>
                <Typography className={classes.title} variant='h4'>
                  You scored : {answerkey.totalScore}/{answerkey.answers.length}{' '}
                </Typography>
                <Typography variant='h6'>
                  Aptitude : {answerkey.aptitudeScore}
                </Typography>
                <Typography variant='h6'>
                  Verbal : {answerkey.verbalScore}
                </Typography>
                <Typography variant='h6'>
                  Coding : {answerkey.codingScore}
                </Typography>
                <Typography variant='h6'>
                  Core : {answerkey.coreScore}
                </Typography>
              </div>
            )}
            {answerkey &&
              answerkey.answers.map((e) => <AnswerKeyCard answers={e} />)}
          </Grid>
        ) : (
          <WaitScreen text={`Your answers will be displayed soon`} />
        )}
      </Grid>
    </Container>
  );
};

export default UserAnswerScreen;
