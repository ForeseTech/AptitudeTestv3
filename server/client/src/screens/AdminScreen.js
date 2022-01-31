import React, { useEffect } from 'react';
import CreateScreen from './CreateScreen';
import AdminQuestionScreen from './AdminQuestionScreen';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeaderBoardScreen from './LeaderBoardScreen';
import AdminProfileScreen from './AdminProfileScreen';
import NotFound from './NotFound';

const AdminScreen = ({ history }) => {
  const location = useLocation();
  const currpath = location.pathname;

  var screen = currpath.split('/')[2];

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (!adminInfo) {
      history.push('/alogin');
    }
  }, [history, adminInfo]);

  if (screen === 'profile') {
    return <AdminProfileScreen />;
  } else if (screen === 'create') {
    return <CreateScreen />;
  } else if (screen === 'questions') {
    return <AdminQuestionScreen />;
  } else if (screen === 'leaderboard') {
    return <LeaderBoardScreen />;
  } else if (screen === 'edit') {
    return null;
  } else {
    return <NotFound />;
  }
};

export default AdminScreen;
