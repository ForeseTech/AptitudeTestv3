import axios from 'axios';
import { config } from 'dotenv';
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
  TEST_QUESTIONS_REQUEST,
  TEST_QUESTIONS_SUCCESS,
  TEST_QUESTIONS_FAIL,
  SUBMIT_TEST_REQUEST,
  SUBMIT_TEST_FAIL,
  SUBMIT_TEST_SUCCESS,
  GET_QUESTIONBYID_REQUEST,
  GET_QUESTIONBYID_SUCCESS,
  GET_QUESTIONBYID_FAIL,
  TEST_QUESTIONS_ANSWERED,
} from '../constants/questionConstants';

export const createQuestion =
  (
    questionDept,
    questionCategory,
    questionText,
    options,
    correctAnswer,
    imageUrl
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/question/create',
        {
          questionDept,
          questionCategory,
          questionText,
          options,
          correctAnswer,
          imageUrl,
        },
        config
      );

      dispatch({
        type: QUESTION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllQuestions = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_QUESTIONS_REQUEST,
    });

    const { data } = await axios.get('/api/question/');

    dispatch({
      type: GET_QUESTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUESTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editQuestion =
  (correctAnswer, questionDept, questionText, options, imageUrl, id) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_QUESTION_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/question/${id}`,
        { correctAnswer, questionDept, questionText, options, imageUrl },
        config
      );

      dispatch({
        type: EDIT_QUESTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_QUESTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getTestQuestions = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    var dept = userInfo.dept;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users/usercheck', config);

    if (data.testAnswered === true) {
      dispatch({
        type: TEST_QUESTIONS_ANSWERED,
        payload: data,
      });
    } else {
      dispatch({
        type: TEST_QUESTIONS_REQUEST,
      });

      const { data } = await axios.post('/api/question/test', { dept }, config);

      dispatch({
        type: TEST_QUESTIONS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: TEST_QUESTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const submitAnswer = (answers) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBMIT_TEST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/question/submit',
      { answers },
      config
    );

    dispatch({
      type: SUBMIT_TEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBMIT_TEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getQuestionByID = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_QUESTIONBYID_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/questions/${id}`, config);

    dispatch({
      type: GET_QUESTIONBYID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUESTIONBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
