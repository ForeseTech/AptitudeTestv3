import {
  TIMER_END,
  TIMER_START,
  GET_TIMER,
  TIMER_STATUS,
  TIMER_RESET,
  USER_TIMER_END,
} from '../constants/timerConstants';

export const timerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TIMER:
      return { time: action.payload };
    case TIMER_START:
      return { start: true, time: action.payload };
    case TIMER_END:
      return { stop: true, time: action.payload };
    case USER_TIMER_END:
      return { stop: true };
    case TIMER_RESET:
      return {};
    default:
      return state;
  }
};

export const timerStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case TIMER_STATUS:
      return { status: action.payload };
    default:
      return state;
  }
};
