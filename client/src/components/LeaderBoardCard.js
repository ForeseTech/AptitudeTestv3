import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const styles = makeStyles({
  root: {
    width: '90vw',
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  numGrid: {
    textAlign: 'center',
  },
  td: {
    textAlign: 'center',
  },
});

const LeaderBoardCard = ({ name, regNo, score, index, dept }) => {
  const classes = styles();

  return (
    <tr>
      <td className={classes.td}>{index + 1}</td>
      <td className={classes.td}>{name}</td>
      <td className={classes.td}>{regNo}</td>
      <td className={classes.td}>{dept}</td>
      <td className={classes.td}>{score}</td>
    </tr>
  );
};

export default LeaderBoardCard;
