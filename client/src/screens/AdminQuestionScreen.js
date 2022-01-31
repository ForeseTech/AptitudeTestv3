import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getAllQuestions } from '../actions/questionActions';
import Loader from '../components/Loader';
import QuestionAccordion from '../components/QuestionAccordion';
import { allBranches, commonCategory } from '../data';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '2rem',
  },
  textField: {
    width: '15rem',
    margin: '0 2rem',
  },
  questionAccordions: {
    margin: '2rem',
  },
});

const AdminQuestionScreen = ({ history }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const allQuestions = useSelector((state) => state.allQuestions);
  const { question, loading, error } = allQuestions;

  const dispatch = useDispatch();

  const [dept, setDept] = useState('All');
  const [category, setCategory] = useState(null);

  var filteredQuestion;

  // if(dept === "All"){
  //     filteredQuestion = question
  // }else{
  //     filteredQuestion = question && question.filter(q => q.questionDept === dept)
  // }

  filteredQuestion =
    question &&
    question.filter(
      (q) => q.questionDept === dept && q.questionCategory === category
    );

  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);

  const handleDepartment = (e) => {
    if (e !== 'All') {
      setCategory('Core');
      setDept(e);
    } else {
      setDept(e);
    }
  };

  const handleCategory = (e) => {
    if (dept !== 'All') {
      setCategory('Core');
    } else {
      setCategory(e);
    }
  };

  return (
    <Container>
      {loading && <Loader />}
      <Grid container className={classes.root}>
        <div>
          <TextField
            select
            variant='filled'
            size='small'
            className={classes.textField}
            label='Branch'
            value={dept}
            onChange={(e) => handleDepartment(e.target.value)}
          >
            {allBranches.map((e) => (
              <MenuItem key={e.id} value={e.value}>
                {e.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            variant='filled'
            size='small'
            className={classes.textField}
            label='Category'
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
          >
            {commonCategory.map((e) => (
              <MenuItem key={e.id} value={e.value}>
                {e.value}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Grid item className={classes.questionAccordions}>
          {question &&
            filteredQuestion.map((ele) => (
              <QuestionAccordion
                question={ele.questionText}
                options={ele.options}
                id={ele._id}
              />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminQuestionScreen;
