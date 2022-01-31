import React, { useEffect } from 'react';
import CreateScreen from './CreateScreen';
import VolunteerProfileScreen from './VolunteerProfileScreen';
import NotFound from './NotFound';
import QuestionScreen from './QuestionScreen';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const VolunteerScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const location = useLocation();
  const currpath = location.pathname;

  var screen = currpath.split('/')[2];

  useEffect(() => {
    if (!userInfo) {
      history.push('/vlogin');
    } else if (!userInfo.isVolunteer) {
      history.push('/');
    }
  }, [history, userInfo]);

  if (screen === 'create') {
    return <CreateScreen />;
  } else if (screen === 'profile') {
    return <VolunteerProfileScreen />;
  } else if (screen === 'question') {
    return <QuestionScreen />;
  } else {
    return <NotFound />;
  }
};

export default VolunteerScreen;
