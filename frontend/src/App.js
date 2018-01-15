import React from 'react'
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Welcome from './pages/Welcome';
import Catalogue from './pages/Catalogue';
import Survey from './pages/Survey';
import Thanks from './pages/Thanks';
import Navbar from './components/Navbar';

const App = () => (
        <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/forgot" component={ForgotPasswordPage} />
            <Route path="/reset" component={ResetPasswordPage} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/catalogue" component={Catalogue} />
            <Route path="/survey" component={Survey} />
            <Route path="/thanks" component={Thanks} />
        </div>
  )

export default App;
