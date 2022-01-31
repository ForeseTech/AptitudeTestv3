import React, { useEffect, useState } from 'react';
import { Container, makeStyles, Button, Grid } from '@material-ui/core';
import Message from '../components/Message';
import EditForm from '../components/EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { editQuestion } from '../actions/questionActions';
import axios from 'axios';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  submitBtn: {
    textAlign: 'center',
    padding: '2rem',
  },
});

const QuestionScreen = ({ match, history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const editQuestionState = useSelector((state) => state.editQuestion);
  const { success, error } = editQuestionState;

  const [questions, setQuestions] = useState([
    {
      questionText: '',
      questionDept: '',
      questionCategory: '',
      options: [
        {
          optionText: {
            text: '',
            answer: false,
          },
          uid: '',
        },
      ],
      open: true,
      correctAnswer: '',
      required: false,
    },
  ]);

  useEffect(() => {
    getQuestionByIdHandler();
  }, []);

  const getQuestionByIdHandler = async () => {
    const { data } = await axios.get(`/api/question/${match.params.id}`);
    console.log(data);
    setQuestions([data]);
  };

  const updateQuestion = (text, i) => {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
  };

  const updateDeptValue = (text, i) => {
    var dept = [...questions];
    dept[i].questionDept = text;
    setQuestions(dept);
  };

  const updateQuestionCategoryValue = (text, i) => {
    var questionCat = [...questions];
    questionCat[i].questionCategory = text;
    setQuestions(questionCat);
  };

  const updateOptionValue = (text, i, j) => {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText.text = text;
    setQuestions(optionsQuestion);
  };

  const updateImageUrl = (url, i) => {
    var image = [...questions];
    image[i].imageUrl = url;
    setQuestions(image);
  };

  const removeOption = (i, j) => {
    var removeOptionQuestion = [...questions];
    if (removeOptionQuestion[i].options.length > 1) {
      removeOptionQuestion[i].options.splice(j, 1);
      setQuestions(removeOptionQuestion);
    }
  };

  const addOption = (i) => {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: {
          text: 'Option ' + (optionsOfQuestion[i].options.length + 1),
          answer: false,
        },
      });
    } else {
      console.log('Max 5 Options');
    }

    setQuestions(optionsOfQuestion);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/question/${match.params.id}`);
    history.push('/volunteer/profile');
  };

  const handleCorrectAnswer = (e, i) => {
    var optionCorrectAnswer = [...questions];
    optionCorrectAnswer[i].correctAnswer = e.target.value;
    setQuestions(optionCorrectAnswer);
  };

  const handleSubmit = () => {
    const question = questions[0];

    dispatch(
      editQuestion(
        question.correctAnswer,
        question.questionDept,
        question.questionText,
        question.options,
        question.imageUrl,
        match.params.id
      )
    );
  };

  return (
    <Container>
      {success ? (
        <Message
          message={'Question Updated successfully'}
          severity={'success'}
          isOpen={true}
        />
      ) : (
        ''
      )}
      <Grid container>
        <Grid item md={12} className={classes.form}>
          {questions ? (
            <EditForm
              updateQuestion={updateQuestion}
              updateDeptValue={updateDeptValue}
              updateQuestionCategoryValue={updateQuestionCategoryValue}
              updateOptionValue={updateOptionValue}
              removeOption={removeOption}
              addOption={addOption}
              questions={questions}
              handleDelete={handleDelete}
              handleCorrectAnswer={handleCorrectAnswer}
              updateImageUrl={updateImageUrl}
            />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
      <div className={classes.submitBtn}>
        <Button variant='contained' onClick={handleSubmit}>
          Update
        </Button>
      </div>
    </Container>
  );
};

export default QuestionScreen;
