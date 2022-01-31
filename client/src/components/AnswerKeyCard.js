import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { CheckCircle, Cancel, Error } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    margin: ' 3rem 0',
    padding: '1.5rem',
  },
  options: {
    margin: '0.8rem 0',
    padding: '0.2rem 0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: '#ededed',
  },

  wrongOption: {
    backgroundColor: 'rgb(211,47,47, 0.7)',
    margin: '0.8rem 0',
    padding: '0.2rem 0.5rem',
    borderRadius: '0.5rem',
  },

  correctOption: {
    backgroundColor: 'rgb(56, 142, 60, 0.6)',
    margin: '0.8rem 0',
    padding: '0.2rem 0.5rem',
    borderRadius: '0.5rem',
  },

  icon: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    margin: '1rem 0 0 0',
  },

  correctColor: {
    color: 'rgb(56, 142, 60)',
  },

  incorrectColor: {
    color: 'rgb(211,47,47)',
  },
  unattemptedColor: {
    color: 'rgb(245, 124, 0)',
  },
});

const AnswerKeyCard = ({
  answers: { questionText, options, correctAnswer, userAnswer },
}) => {
  const classes = useStyles();

  const correctIcon = (
    <div className={classes.icon}>
      <CheckCircle className={classes.correctColor} />
      <Typography className={classes.correctColor} variant='subtitle1'>
        {' '}
        Correct
      </Typography>
    </div>
  );

  const wrongIcon = (
    <div className={classes.icon}>
      <Cancel className={classes.incorrectColor} />
      <Typography className={classes.incorrectColor} variant='subtitle1'>
        {' '}
        Incorrect
      </Typography>
    </div>
  );

  const unattemptedIcon = (
    <div className={classes.icon}>
      <Error className={classes.unattemptedColor} />
      <Typography className={classes.unattemptedColor} variant='subtitle1'>
        Unattempted
      </Typography>
    </div>
  );

  return (
    <div>
      <Paper className={classes.root} elevation={5}>
        <Typography variant='h6'>{questionText}</Typography>
        {options.map((e) => (
          <div
            className={
              correctAnswer === e.uid
                ? `${classes.correctOption}`
                : userAnswer !== correctAnswer && userAnswer === e.uid
                ? `${classes.wrongOption}`
                : `${classes.options}`
            }
          >
            <Typography variant='caption'>{e.optionText.text}</Typography>
          </div>
        ))}
        {userAnswer === null
          ? unattemptedIcon
          : userAnswer === correctAnswer
          ? correctIcon
          : wrongIcon}
      </Paper>
    </div>
  );
};

export default AnswerKeyCard;
