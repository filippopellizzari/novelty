import React from 'react'
import { Route } from 'react-router-dom';
import PropTypes from "prop-types";

import UserRoute from "./routes/UserRoute";

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

const App = ({ location }) => (
        <div>
            <Navbar />
            <Route location={location} exact path="/" component={Home} />
            <Route location={location} path="/login" component={LoginPage} />
            <Route location={location} path="/signup" component={SignupPage} />
            <Route location={location} path="/forgot" component={ForgotPasswordPage} />
            <Route location={location} path="/reset" component={ResetPasswordPage} />
            <UserRoute location={location} path="/welcome" component={Welcome} />
            <Route location={location} path="/catalogue" component={Catalogue} />
            <Route location={location} path="/survey" component={Survey} />
            <Route location={location} path="/thanks" component={Thanks} />
        </div>
  )

  App.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  };

export default App;
