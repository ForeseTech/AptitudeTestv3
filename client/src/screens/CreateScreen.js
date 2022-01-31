import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, makeStyles, Grid, Button, Fab } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { createQuestion } from '../actions/questionActions';
import { v4 as uuidv4 } from 'uuid';
import Form from '../components/Form';
import Message from '../components/Message';

const useStyles = makeStyles({
  createScreen: {
    padding: '2rem 0',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  addBtn: {
    position: 'fixed',
    right: 30,
    bottom: 30,
  },
  submitBtn: {
    textAlign: 'center',
    padding: '2rem',
  },
});

const CreateScreen = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const questionCreate = useSelector((state) => state.questionCreate);
  const { question, loading, error, success } = questionCreate;

  const [questions, setQuestions] = useState([
    {
      questionText: '',
      questionDept: '',
      questionCategory: '',
      imageUrl: '',
      options: [
        {
          optionText: {
            text: '',
            answer: false,
          },
          uid: uuidv4(),
        },
      ],
      userAnswer: null,
      correctAnswer: null,
      open: true,
      required: false,
    },
  ]);

  const changeQuestion = (text, i) => {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
  };

  const changeDeptValue = (text, i) => {
    var dept = [...questions];
    dept[i].questionDept = text;
    setQuestions(dept);
  };

  const changeQuestionCategoryValue = (text, i) => {
    var questionCat = [...questions];
    questionCat[i].questionCategory = text;
    setQuestions(questionCat);
  };

  const changeOptionValue = (text, i, j) => {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText.text = text;
    setQuestions(optionsQuestion);
  };

  const changeImageUrl = (url, i) => {
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
        uid: uuidv4(),
      });
    } else {
      console.log('Max 5 Options');
    }

    setQuestions(optionsOfQuestion);
  };

  const addMoreQuestionField = () => {
    setQuestions([
      ...questions,
      {
        questionText: 'question',
        questionDept: '',
        questionType: 'radio',
        options: [
          { optionText: { text: 'Option 1', asnswer: false }, uid: uuidv4() },
        ],
        correctAnswer: null,
        open: true,
        required: false,
      },
    ]);
  };

  const deleteQuestion = (i) => {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  };

  const handleCorrectAnswer = (e, i) => {
    var optionCorrectAnswer = [...questions];
    optionCorrectAnswer[i].correctAnswer = e.target.value;
    setQuestions(optionCorrectAnswer);
  };

  const handleSubmit = () => {
    for (var i = 0; i < questions.length; i++) {
      var question = questions[i];
      dispatch(
        createQuestion(
          question.questionDept,
          question.questionCategory,
          question.questionText,
          question.options,
          question.correctAnswer,
          question.imageUrl
        )
      );
    }

    setQuestions([
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
          },
        ],
        open: true,
        required: false,
      },
    ]);

    // setTimeout(() => {
    //     window.location.reload(true)
    // },2000)
  };

  return (
    <Container>
      {success ? (
        <Message
          message={'Question created successfully'}
          severity={'success'}
          isOpen={true}
        />
      ) : (
        ''
      )}
      <Grid container>
        <Grid item md={12} className={classes.form}>
          <Form
            changeQuestion={changeQuestion}
            changeDeptValue={changeDeptValue}
            changeQuestionCategoryValue={changeQuestionCategoryValue}
            changeOptionValue={changeOptionValue}
            removeOption={removeOption}
            addOption={addOption}
            handleSubmit={handleSubmit}
            questions={questions}
            setQuestions={setQuestions}
            deleteQuestion={deleteQuestion}
            handleCorrectAnswer={handleCorrectAnswer}
            changeImageUrl={changeImageUrl}
          />
        </Grid>
      </Grid>
      <div className={classes.submitBtn}>
        <Button variant='contained' onClick={handleSubmit}>
          submit
        </Button>
      </div>
      <Fab className={classes.addBtn} onClick={addMoreQuestionField}>
        <AddCircle style={{ fontSize: 50 }} />
      </Fab>
    </Container>
  );
};

export default CreateScreen;
