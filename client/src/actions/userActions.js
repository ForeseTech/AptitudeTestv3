import axios from 'axios';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_FEEDBACK_REQUEST,
  USER_FEEDBACK_SUCCESS,
  USER_FEEDBACK_FAIL,
  GET_ANSWERKEY_SUCCESS,
  GET_ANSWERKEY_REQUEST,
  GET_ANSWERKEY_FAIL,
} from '../constants/userConstants';

export const login = (name, email, regNo, dept, isVolunteer) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const time = await axios.get('/api/timer');
    const timerData = time.data;

    if (timerData[0].start) {
      const { data } = await axios.post(
        '/api/users/',
        { name, email, regNo, dept, isVolunteer },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.removeItem('adminInfo');
    } else {
      throw new Error('NOT ALLOWED');
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const createFeedback =
  (review, rating, difficulty) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      dispatch({
        type: USER_FEEDBACK_REQUEST,
      });

      const { data } = await axios.post(
        '/api/users/feedback/',
        { review, rating, difficulty },
        config
      );

      dispatch({
        type: USER_FEEDBACK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_FEEDBACK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAnswerKey = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({
      type: GET_ANSWERKEY_REQUEST,
    });

    const { data } = await axios.get('/api/users/answerkey/', config);

    dispatch({
      type: GET_ANSWERKEY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ANSWERKEY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
