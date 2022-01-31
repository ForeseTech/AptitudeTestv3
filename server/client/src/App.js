import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import VolunteerLoginScreen from './screens/VolunteerLoginScreen';
import VolunteerScreen from './screens/VolunteerScreen';
import QuestionScreen from './screens/QuestionScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import AdminRegisterScreen from './screens/AdminRegisterScreen';
import AdminScreen from './screens/AdminScreen';
import AdminEditQuestionScreen from './screens/AdminEditQuestionScreen';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <main className='app'>
          <Route path='/' component={LoginScreen} exact />
          <Route path='/test' component={UserScreen} />
          <Route path='/vlogin' component={VolunteerLoginScreen} />
          <Route path='/volunteer' component={VolunteerScreen} />
          <Route path='/question/:id' component={QuestionScreen} />
          <Route path='/alogin' component={AdminLoginScreen} />
          <Route path='/aregister' component={AdminRegisterScreen} />
          <Route path='/admin/edit/:id' component={AdminEditQuestionScreen} />
          <Route path='/admin' component={AdminScreen} />
        </main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
