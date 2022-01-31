import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Typography, makeStyles, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '70vw',
  },
  option: {
    fontSize: '0.75rem',
    margin: '0.4rem 0',
  },
  editIcon: {
    float: 'right',
    margin: '1rem',
  },
});

const QuestionAccordion = ({ question, options, id }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();

  return (
    <ExpansionPanel
      className={classes.root}
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Typography>{question}</Typography>
        <Typography sx={{ color: 'text.secondary' }}></Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {options.map((op, i) => (
            <Typography className={classes.option}>
              {i + 1} . {op.optionText.text}
            </Typography>
          ))}
        </Typography>
      </ExpansionPanelDetails>
      <Link to={`/admin/edit/${id}`}>
        <IconButton className={classes.editIcon}>
          <Edit />
        </IconButton>
      </Link>
    </ExpansionPanel>
  );
};

export default QuestionAccordion;
