import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const styles = makeStyles({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const Loader = () => {
  const classes = styles();

  return (
    <div>
      <CircularProgress className={classes.buttonProgress} />
    </div>
  );
};

export default Loader;
