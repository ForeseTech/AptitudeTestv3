import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { getTestQuestions } from '../actions/questionActions';
import FeedbackScreen from './FeedbackScreen';
import UserAnswerScreen from './UserAnswerScreen';
import TestScreen from './TestScreen';

const UserScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testQuestions = useSelector((state) => state.testQuestions);
  const { userAnswered, loading, questions } = testQuestions;

  useEffect(() => {
    dispatch(getTestQuestions());

    if (!userInfo) {
      history.push('/');
    } else if (userInfo && userInfo.isVolunteer) {
      history.push('/');
    }
  }, [history, userInfo]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : userAnswered && userAnswered.feedback ? (
        <UserAnswerScreen />
      ) : userAnswered && userAnswered.testAnswered ? (
        <FeedbackScreen />
      ) : (
        <TestScreen questions={questions} />
      )}
    </div>
  );
};

export default UserScreen;
