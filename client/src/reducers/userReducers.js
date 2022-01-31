import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_FEEDBACK_REQUEST,
  USER_FEEDBACK_SUCCESS,
  USER_FEEDBACK_FAIL,
  GET_ANSWERKEY_REQUEST,
  GET_ANSWERKEY_FAIL,
  GET_ANSWERKEY_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userCreateFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FEEDBACK_REQUEST:
      return { loading: true };
    case USER_FEEDBACK_SUCCESS:
      return { loading: false, feedback: action.payload };
    case USER_FEEDBACK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAnswerKeyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ANSWERKEY_REQUEST:
      return { loading: true };
    case GET_ANSWERKEY_SUCCESS:
      return { loading: false, answerkey: action.payload };
    case GET_ANSWERKEY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
