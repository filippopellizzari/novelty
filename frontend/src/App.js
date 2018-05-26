import React from 'react'
import PropTypes from "prop-types";

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SocialSignupPage from './pages/SocialSignupPage';
import CompleteSignupPage from './pages/CompleteSignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ActivateAccountPage from './pages/ActivateAccountPage';
import Welcome from './pages/Welcome';
import Catalogue from './pages/Catalogue';
import Survey from './pages/Survey';
import Thanks from './pages/Thanks';
import Navbar from './components/Navbar';

import UserRoute from './route/UserRoute';
import GuestRoute from './route/GuestRoute';

const App = ({location}) => (
        <div>
            <Navbar />
            <GuestRoute location={location} exact path="/home/:survey_id/:crowd/" component={Home} />
            <GuestRoute location={location} path="/login" component={LoginPage} />
            <GuestRoute location={location} path="/signup" component={SignupPage} />
            <GuestRoute location={location} path="/socialSignup" component={SocialSignupPage} />
            <GuestRoute location={location} path="/completeSignup" component={CompleteSignupPage} />
            <GuestRoute location={location} path="/forgot" component={ForgotPasswordPage} />
            <GuestRoute location={location} path="/reset/:uid/:token" component={ResetPasswordPage} />
            <GuestRoute location={location} path="/activate/:uid/:token" component={ActivateAccountPage} />
            <UserRoute location={location} path="/welcome" component={Welcome} />
            <UserRoute location={location} path="/catalogue" component={Catalogue} />
            <UserRoute location={location} path="/survey" component={Survey} />
            <UserRoute location={location} path="/thanks" component={Thanks} />
        </div>
  )

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
