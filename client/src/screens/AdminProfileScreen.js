import React, { useState, useEffect } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Container,
  Grid,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Button, Stack } from '@mui/material';
import { AlarmOn, PlayCircleOutline } from '@material-ui/icons';
import axios from 'axios';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Timer from '../components/Timer';
import { useDispatch } from 'react-redux';
import { startTimer, resetTimer } from '../actions/timerActions';

const useStyles = makeStyles({
    root: {
        padding: "2rem 0"
    },
    grid:{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    timerGrid:{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "10rem 0"
    },
    timer:{
        margin: "0 0 2rem 0"
    },
    btn:{
        margin: "1rem",
    },
    btnText:{
        margin: "0 3px"
    }
    
})

const AdminProfileScreen = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getTimings();
  }, []);

  const handleEndTime = (value) => {
    setEndTime(value);
  };

  const getTimings = async () => {
    const { data } = await axios.get('/api/timer');
    setStartTime(Date.parse(new Date()));
    setEndTime(data[0].endTime);
  };

  const handleTimer = async () => {
    setRefresh(!refresh);
  };

  const handleSet = async () => {
    dispatch(startTimer(endTime));
  };

  const handleReset = async () => {
    dispatch(resetTimer());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container className={classes.root}>
        <Grid container>
          <Grid item md={12} sm={12} className={classes.grid}>
            <DateTimePicker
              label='End Time'
              value={endTime}
              onChange={handleEndTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item md={12} sm={12} className={classes.timerGrid}>
            <Typography variant='h2' className={classes.timer}>
              <Timer refresh={refresh} />
            </Typography>
            <Stack direction='row' spacing={2}>
              <Button
                variant='outlined'
                color='error'
                onClick={handleSet}
                className={classes.btn}
              >
                <Typography variant='h6' className={classes.btnText}>
                  SET
                </Typography>{' '}
                <AlarmOn />
              </Button>
              <Button
                variant='outlined'
                color='success'
                onClick={handleTimer}
                className={classes.btn}
              >
                <Typography variant='h6' className={classes.btnText}>
                  START
                </Typography>{' '}
                <PlayCircleOutline />
              </Button>
              <Button
                variant='outlined'
                color='warning'
                onClick={handleReset}
                className={classes.btn}
              >
                <Typography variant='h6' className={classes.btnText}>
                  RESET
                </Typography>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default AdminProfileScreen;
