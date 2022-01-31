import React from 'react';
import {
  Paper,
  makeStyles,
  TextField,
  IconButton,
  Button,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { Cancel, DeleteForever } from '@material-ui/icons';
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
  option: {
    margin: '0.8rem 0',
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: '500',
    width: '8rem',
  },
  deleteBtn: {
    float: 'right',
  },
  fieldBranch: {
    margin: '0.5rem 0',
  },
  questionWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  previewImage: {
    width: '80px',
    height: '56.4px',
    borderRadius: '6px',
    margin: '0 0 0 8px',
  },
});

const EditForm = ({
  updateQuestion,
  updateDeptValue,
  updateQuestionCategoryValue,
  updateOptionValue,
  removeOption,
  addOption,
  questions,
  handleDelete,
  handleCorrectAnswer,
  updateImageUrl,
}) => {
  const classes = useStyles();

  return questions.map((ques, i) => (
    <Paper className={classes.root} elevation={2}>
      <TextField
        select
        variant='outlined'
        className={classes.fieldBranch}
        label='Select Question Branch'
        value={ques.questionDept}
        onChange={(e) => updateDeptValue(e.target.value, i)}
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
        className={classes.fieldBranch}
        label='Select Question Branch'
        value={ques.questionCategory}
        onChange={(e) => updateQuestionCategoryValue(e.target.value, i)}
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
          label='Question'
          placeholder='Enter your Question'
          onChange={(e) => updateQuestion(e.target.value, i)}
        />
        <TextField
          className={classes.previewImage}
          variant='outlined'
          label='URL'
          value={ques.imageUrl}
          onChange={(e) => updateImageUrl(e.target.value, i)}
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
              control={<Radio color='primary' />}
            />
          </RadioGroup>
          <TextField
            label={`Option ${j + 1}`}
            variant='outlined'
            required={true}
            value={ques.options[j].optionText.text}
            onChange={(e) => updateOptionValue(e.target.value, i, j)}
          />
          <IconButton onClick={() => removeOption(i, j)}>
            <Cancel style={{ color: '#F05454' }} />
          </IconButton>
        </div>
      ))}

      <div className={classes.footer}>
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
        <Button
          onClick={handleDelete}
          variant='outlined'
          color='secondary'
          className={classes.deleteBtn}
        >
          Delete <DeleteForever style={{ fontSize: 18 }} />
        </Button>
      </div>
    </Paper>
  ));
};

export default EditForm;
