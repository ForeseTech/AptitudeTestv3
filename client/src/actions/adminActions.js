import axios from 'axios';
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  GET_LEADERBOARD_REQUEST,
  GET_LEADERBOARD_SUCCESS,
  EDIT_QUESTIONBYADMIN_REQUEST,
  EDIT_QUESTIONBYADMIN_SUCCESS,
  EDIT_QUESTIONBYADMIN_FAIL,
} from '../constants/adminConstants';
import { GET_QUESTIONS_FAIL } from '../constants/questionConstants';

export const registerAdmin = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/admin/',
      { name, email, password },
      config
    );

    dispatch({
      type: ADMIN_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem('adminInfo', JSON.stringify(data));
    localStorage.removeItem('userInfo');
  } catch (error) {
    dispatch({
      type: ADMIN_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/admin/login',
      { email, password },
      config
    );

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('adminInfo', JSON.stringify(data));
    localStorage.removeItem('userInfo');
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminLogout = () => (dispatch) => {
  localStorage.removeItem('adminInfo');
  dispatch({ type: ADMIN_LOGOUT });
};

export const getLeaderBoard = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LEADERBOARD_REQUEST,
    });

    const { data } = await axios.get('/api/admin/answers');

    const sort = (arr) => {
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
          if (arr[j].score < arr[j + 1].score) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }

      return arr;
    };

    const sortedData = sort(data);

    dispatch({
      type: GET_LEADERBOARD_SUCCESS,
      payload: sortedData,
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

export const adminEditQuestion =
  (correctAnswer, questionDept, questionText, options, id) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_QUESTIONBYADMIN_REQUEST,
      });

      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/question/${id}`,
        { correctAnswer, questionDept, questionText, options },
        config
      );

      dispatch({
        type: EDIT_QUESTIONBYADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_QUESTIONBYADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
