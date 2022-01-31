import {
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_FAIL,
  QUESTION_CREATE_SUCCESS,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAIL,
  EDIT_QUESTION_STOP,
  TEST_QUESTIONS_REQUEST,
  TEST_QUESTIONS_SUCCESS,
  TEST_QUESTIONS_FAIL,
  SUBMIT_TEST_REQUEST,
  SUBMIT_TEST_SUCCESS,
  SUBMIT_TEST_FAIL,
  TEST_QUESTIONS_ANSWERED,
  GET_QUESTIONBYID_REQUEST,
  GET_QUESTIONBYID_SUCCESS,
  GET_QUESTIONBYID_FAIL,
} from '../constants/questionConstants';

export const questionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return { loading: true };
    case QUESTION_CREATE_SUCCESS:
      return { loading: false, question: action.payload, success: true };
    case QUESTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return { loading: true };
    case GET_QUESTIONS_SUCCESS:
      return { loading: false, question: action.payload };
    case GET_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_QUESTION_REQUEST:
      return { loading: true };
    case EDIT_QUESTION_SUCCESS:
      return { loading: false, question: action.payload, success: true };
    case EDIT_QUESTION_STOP:
      return { loading: false, question: action.payload };
    case EDIT_QUESTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_QUESTIONS_REQUEST:
      return { loading: true };
    case TEST_QUESTIONS_SUCCESS:
      return { loading: false, questions: action.payload };
    case TEST_QUESTIONS_FAIL:
      return { loading: false, error: action.payload };
    case TEST_QUESTIONS_ANSWERED:
      return { loading: false, userAnswered: action.payload };
    default:
      return state;
  }
};

export const submitAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_TEST_REQUEST:
      return { loading: true };
    case SUBMIT_TEST_SUCCESS:
      return { loading: false, userAnswers: action.payload, success: true };
    case SUBMIT_TEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONBYID_REQUEST:
      return { loading: true };
    case GET_QUESTIONBYID_SUCCESS:
      return { loading: false, question: action.payload };
    case GET_QUESTIONBYID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
