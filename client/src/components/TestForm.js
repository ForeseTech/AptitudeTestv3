import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswer } from '../actions/questionActions';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  Typography,
  Button,
  Fab,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import SubmitDialog from './SubmitDialog';

const useStyles = makeStyles({
  questionNo: {
    fontFamily: "'Andada Pro', serif",
    fontWeight: '300',
    margin: '5px 0',
  },
  questionSpan: {
    fontSize: '1.1rem',
  },
  questionText: {
    fontFamily: "'Andada Pro', serif",
    fontWeight: 500,
    fontSize: '1.07rem',
    padding: '1rem',
    lineHeight: '1.4rem',
    whiteSpace: 'pre-line',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MsUserSelect: 'none',
  },
  questionOption: {
    margin: '0.1rem 0',
  },
  questionFooter: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    display: 'block',
    margin: '1rem 0',
    width: '75vw',
  },
});

const TestForm = ({ history, questions }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const timer = useSelector((state) => state.timer);
  const { stop } = timer;

  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState(questions);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (stop) {
      handleSubmit();
    }
  }, [stop]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswerChange = (e, i) => {
    var optionAnswer = [...answers];
    optionAnswer[i].userAnswer = e.target.value;
    setAnswers(optionAnswer);
  };

  const handleSubmit = async () => {
    dispatch(submitAnswer(answers));
    setOpen(false);
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  };

  return (
    <div className={classes.PageRoot}>
      {answers ? (
        <>
          {answers.map((question, i) =>
            i === counter ? (
              <div>
                <div className={classes.header}>
                  <Typography className={classes.questionNo} variant='h6'>
                    <b>{i + 1}</b>
                    <span className={classes.questionSpan}>/50</span>
                  </Typography>
                  <Typography variant='h6'>
                    {question.questionCategory.toUpperCase()}
                  </Typography>
                </div>

                <div className={classes.questionContent}>
                  <Typography className={classes.questionText}>
                    {question.questionText}
                  </Typography>
                  {question.imageUrl && (
                    <img
                      src={question.imageUrl}
                      alt={question.imageUrl}
                      className={classes.image}
                    />
                  )}

                  <FormControl className={classes.questionOptionsWrap}>
                    <RadioGroup
                      value={question.userAnswer}
                      onChange={(e) => handleAnswerChange(e, i)}
                      className={classes.questionOptions}
                    >
                      {question.options.map((op, j) => (
                        <FormControlLabel
                          value={op.uid}
                          control={<Radio color='primary' />}
                          label={op.optionText.text}
                          className={classes.questionOption}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            ) : (
              ''
            )
          )}

          <SubmitDialog
            open={open}
            setOpen={setOpen}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />

          <div className={classes.questionFooter}>
            <Fab
              disabled={counter <= 0}
              onClick={() => {
                setCounter(counter - 1);
                setActiveStep(activeStep - 1);
              }}
            >
              <ArrowBack />
            </Fab>
            {answers.length === counter + 1 ? (
              <Button variant='contained' onClick={handleClickOpen}>
                Submit
              </Button>
            ) : null}

            <Fab
              disabled={counter >= answers.length - 1}
              onClick={() => {
                setCounter(counter + 1);
                setActiveStep(activeStep + 1);
              }}
            >
              <ArrowForward />
            </Fab>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default TestForm;
