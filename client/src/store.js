import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  userLoginReducer,
  userCreateFeedbackReducer,
  getAnswerKeyReducer,
} from './reducers/userReducers';
import {
  questionCreateReducer,
  getAllQuestionReducer,
  editQuestionReducer,
  testQuestionsReducer,
  submitAnswerReducer,
  questionByIdReducer,
} from './reducers/questionReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  adminLoginReducer,
  adminRegisterReducer,
  leaderboardReducer,
  adminEditQuestionReducer,
} from './reducers/adminReducer';
import { timerReducer, timerStatusReducer } from './reducers/timerReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  questionCreate: questionCreateReducer,
  allQuestions: getAllQuestionReducer,
  editQuestion: editQuestionReducer,
  testQuestions: testQuestionsReducer,
  answers: submitAnswerReducer,
  adminLogin: adminLoginReducer,
  adminRegister: adminRegisterReducer,
  leaderBoard: leaderboardReducer,
  userFeedback: userCreateFeedbackReducer,
  answerkey: getAnswerKeyReducer,
  questionById: questionByIdReducer,
  adminEditQuestion: adminEditQuestionReducer,
  timer: timerReducer,
  timerStatus: timerStatusReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const adminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
