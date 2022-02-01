import React, { useEffect } from 'react';
import { makeStyles, Typography, Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../actions/questionActions';
import QuestionCard from '../components/QuestionCard';
import Loader from '../components/Loader';

const useStyles = makeStyles({
  cardWrapper: {},
  title: {
    margin: '3rem 0',
    fontFamily: "'Andada Pro', serif",
    fontWeight: '500',
  },
  cardContainer: {
    display: 'flex',
  },
});

const VolunteerProfileScreen = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const allQuestions = useSelector((state) => state.allQuestions);
  const { question, loading } = allQuestions;

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    dispatch(getAllQuestions());
  };

  const filteredQuestion =
    question &&
    userInfo &&
    question.filter((q) => q.creator.userId === userInfo._id);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {filteredQuestion && filteredQuestion.length > 0 ? (
        <Grid container>
          {filteredQuestion.map((q) => (
            <Grid item sm={12} md={3} key={q._id}>
              <QuestionCard
                key={q._id}
                id={q._id}
                questionDept={q.questionDept}
                questionText={q.questionText}
                questionCategory={q.questionCategory}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography className={classes.title} variant='h4'>
          Start creating Questions
        </Typography>
      )}
    </Container>
  );
};

export default VolunteerProfileScreen;
