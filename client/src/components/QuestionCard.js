import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '1rem',
    backgroundColor: '#f7f7f7',
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    margin: '0.5rem 0',
    fontSize: '1.3rem',
    fontWeight: 500,
  },
  dept: {
    fontSize: '0.75rem',
    color: '#383838',
  },
  category: {
    fontSize: '0.75rem',
    fontWeight: '400',
    color: '#383838',
  },
  footer: {},
  iconBtn: {
    padding: '0 12px',
  },
});

const QuestionCard = ({ id, questionDept, questionText, questionCategory }) => {
  const classes = useStyles();

  return (
    <Link to={`/question/${id}`} className={classes.link}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>{questionText}</Typography>
          <div className={classes.footer}>
            <Typography className={classes.dept}>{questionDept}</Typography>
            <Typography className={classes.category}>
              {questionCategory}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QuestionCard;
