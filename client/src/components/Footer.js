import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: '40px',
    padding: '0.01rem',
  },
  text: {
    color: '#000',
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='subtitle1' className={classes.text}>
        Designed and Developed by <b>FORESE Tech</b>
      </Typography>
    </div>
  );
};

export default Footer;
