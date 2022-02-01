import React, { useState } from 'react';
import {
  Container,
  makeStyles,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import RatingStar from '../components/RatingStar';
import SubmitDialog from '../components/SubmitDialog';
import { useDispatch } from 'react-redux';
import { createFeedback, userLogout } from '../actions/userActions';

const useStyles = makeStyles({
  root: {
    padding: '2rem',
  },
  title: {
    margin: '1rem 0',
  },
  radioGroup: {
    display: 'flex',
  },
  star: {
    cursor: 'pointer',
    transition: 'color 200ms',
    padding: '0 5px',
  },
  input: {
    margin: '1rem 0',
  },
  submitBtn: {
    margin: '1rem 0',
  },
});

const FeedbackScreen = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [rating, setRating] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [open, setOpen] = useState(false);

  const [review, setReview] = useState('');

  const [hover, setHover] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(createFeedback(review, rating, difficulty));
    dispatch(userLogout());
  };

  return (
    <Container>
      <Typography variant='h4' className={classes.title}>
        Feedback
      </Typography>
      <div className={classes.input}>
        <Typography variant='h6'>
          How would you rate your experience with the software?
        </Typography>
        <RatingStar
          rating={rating}
          setRating={setRating}
          hover={hover}
          setHover={setHover}
        />
      </div>
      <div className={classes.input}>
        <Typography variant='h6'>
          How would you rate the difficulty level of the questions?
        </Typography>
        <RatingStar
          rating={difficulty}
          setRating={setDifficulty}
          hover={hover}
          setHover={setHover}
        />
      </div>
      <div className={classes.input}>
        <Typography variant='h6'>
          Did you find this exam relevant and useful?
        </Typography>
      </div>
      <div className={classes.input}>
        <TextField
          variant='outlined'
          required
          multiline={true}
          rows={4}
          value={review}
          fullWidth
          onChangeCapture={(e) => setReview(e.target.value)}
        />
      </div>
      <SubmitDialog
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <div>
        <Button
          variant='outlined'
          onClick={handleClickOpen}
          className={classes.submitBtn}
        >
          submit
        </Button>
      </div>
    </Container>
  );
};

export default FeedbackScreen;
