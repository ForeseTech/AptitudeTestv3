import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  EDIT_QUESTIONBYADMIN_REQUEST,
  EDIT_QUESTIONBYADMIN_SUCCESS,
  EDIT_QUESTIONBYADMIN_FAIL,
  GET_LEADERBOARD_FAIL,
  GET_LEADERBOARD_REQUEST,
  GET_LEADERBOARD_SUCCESS,
} from '../constants/adminConstants';

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true };
    case ADMIN_REGISTER_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const leaderboardReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LEADERBOARD_REQUEST:
      return { loading: true };
    case GET_LEADERBOARD_SUCCESS:
      return { loading: false, leaderboardInfo: action.payload };
    case GET_LEADERBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminEditQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_QUESTIONBYADMIN_REQUEST:
      return { loading: true };
    case EDIT_QUESTIONBYADMIN_SUCCESS:
      return { loading: false, data: action.payload };
    case EDIT_QUESTIONBYADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
