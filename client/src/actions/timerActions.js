import axios from 'axios';
import {
  TIMER_END,
  TIMER_START,
  GET_TIMER,
  TIMER_STATUS,
  TIMER_RESET,
  USER_TIMER_END,
} from '../constants/timerConstants';

export const startTimer = (endTime) => async (dispatch) => {
  let start = true;
  let testCompleted = false;

  await axios.post('/api/timer/', { endTime, start, testCompleted });
  const { data } = await axios.get('/api/timer/');

  dispatch({ type: TIMER_START, payload: data });
};

export const endTimer = () => async (dispatch) => {
  let start = false;
  let testCompleted = false;
  let endTime = new Date().toISOString();
  await axios.post('/api/timer/', { start, endTime, testCompleted });

  dispatch({ type: TIMER_END });
};

export const endUserTimer = () => async (dispatch) => {
  dispatch({ type: USER_TIMER_END });
};

export const resetTimer = () => async (dispatch) => {
  let start = false;
  let testCompleted = false;
  let endTime = new Date().toISOString();
  await axios.post('/api/timer/', { start, endTime, testCompleted });

  dispatch({ type: TIMER_RESET });
};

export const getTime = () => async (dispatch) => {
  const { data } = await axios.get('/api/timer');
  dispatch({ type: GET_TIMER, payload: data });
};

export const getTimerStatus = () => async (dispatch) => {
  const { data } = await axios.get('/api/timer');
  dispatch({ type: TIMER_STATUS, payload: data[0].start });
};
