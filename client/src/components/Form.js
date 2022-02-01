import React from 'react';
import {
  Paper,
  makeStyles,
  TextField,
  IconButton,
  Button,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import { Cancel, Delete } from '@material-ui/icons';
import { allBranches, specificCategory, commonCategory } from '../data';

const useStyles = makeStyles({
  root: {
    margin: '2rem',
    width: '85%',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  question: {
    margin: '0.5rem 0',
    width: '93%',
  },
  questionWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  option: {
    margin: '0.8rem 0',
    display: 'flex',
    alignItems: 'center',
  },
  optionWrap: {
    display: 'flex',
  },
  btn: {
    fontFamily: "'Andada Pro', serif",
    fontWeight: '500',
    width: '8rem',
  },
  imageBtn: {
    padding: '0.95rem 0',
    margin: '0 0 0 0.5rem',
  },
  previewImage: {
    width: '80px',
    height: '56.4px',
    borderRadius: '6px',
    margin: '0 0 0 8px',
  },
  trashBtn: {
    float: 'right',
  },
  fieldBranch: {
    margin: '0.5rem 0',
  },
});

const Form = ({
  changeDeptValue,
  changeQuestionCategoryValue,
  changeQuestion,
  changeOptionValue,
  removeOption,
  addOption,
  handleSubmit,
  questions,
  deleteQuestion,
  handleCorrectAnswer,
  changeImageUrl,
}) => {
  const classes = useStyles();

  return questions.map((ques, i) => (
    <Paper className={classes.root} elevation={2}>
      <TextField
        select
        variant='outlined'
        required={true}
        className={classes.fieldBranch}
        label='Select Question Branch'
        value={ques.questionDept}
        onChange={(e) => changeDeptValue(e.target.value, i)}
      >
        {allBranches.map((e) => (
          <MenuItem key={e.id} value={e.value}>
            {e.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        variant='outlined'
        required={true}
        className={classes.fieldBranch}
        label='Question Category'
        value={ques.questionCategory}
        onChange={(e) => changeQuestionCategoryValue(e.target.value, i)}
      >
        {ques.questionDept === 'All'
          ? commonCategory.map((e) => (
              <MenuItem key={e.id} value={e.value} disabled={e.disabled}>
                {e.value}
              </MenuItem>
            ))
          : specificCategory.map((e) => (
              <MenuItem key={e.id} value={e.value} disabled={e.disabled}>
                {e.value}
              </MenuItem>
            ))}
      </TextField>
      <div className={classes.questionWrap}>
        <TextField
          id='outlined-with-placeholder'
          className={classes.question}
          value={ques.questionText}
          variant='outlined'
          required={true}
          label='Question'
          placeholder='Enter your Question'
          onChange={(e) => changeQuestion(e.target.value, i)}
        />
        <TextField
          className={classes.previewImage}
          variant='outlined'
          label='URL'
          value={ques.imageUrl}
          onChange={(e) => changeImageUrl(e.target.value, i)}
        />
      </div>

      {ques.options.map((op, j) => (
        <div key={j} className={classes.option}>
          <RadioGroup
            value={ques.correctAnswer}
            onChange={(e) => handleCorrectAnswer(e, i)}
          >
            <FormControlLabel
              value={op.uid}
              control={<Radio color='primary' value={op.uid} />}
            />
          </RadioGroup>
          <TextField
            label={`Option ${j + 1}`}
            variant='outlined'
            required={true}
            value={ques.options[j].optionText.text}
            onChange={(e) => changeOptionValue(e.target.value, i, j)}
          />
          <IconButton onClick={() => removeOption(i, j)}>
            <Cancel style={{ color: '#F05454' }} />
          </IconButton>
        </div>
      ))}

      <div>
        {ques.options.length < 5 ? (
          <Button
            className={classes.btn}
            variant='contained'
            onClick={() => addOption(i)}
          >
            Add Option
          </Button>
        ) : (
          ''
        )}

        {questions.length > 1 ? (
          <IconButton className={classes.trashBtn} onClick={deleteQuestion}>
            <Delete />
          </IconButton>
        ) : (
          ''
        )}
      </div>
    </Paper>
  ));
};

export default Form;
