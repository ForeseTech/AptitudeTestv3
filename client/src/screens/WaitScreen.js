import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: '4rem',
  },
});

const WaitScreen = ({ text }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h4'>{text}</Typography>
    </div>
  );
};

export default WaitScreen;
