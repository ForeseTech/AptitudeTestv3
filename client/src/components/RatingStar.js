import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FaStar } from 'react-icons/fa';

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
    display: 'none',
  },
});

const RatingStar = ({ setRating, setHover, rating, hover }) => {
  const classes = useStyles();

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              className={classes.input}
              type='radio'
              name='rating'
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
            <FaStar
              className={classes.star}
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={25}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingStar;
