import React from 'react'
import PropTypes from "prop-types";

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SocialSignupPage from './pages/SocialSignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
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
            <GuestRoute location={location} exact path="/" component={Home} />
            <GuestRoute location={location} path="/login" component={LoginPage} />
            <GuestRoute location={location} path="/signup" component={SignupPage} />
            <GuestRoute location={location} path="/socialSignup" component={SocialSignupPage} />
            <GuestRoute location={location} path="/forgot" component={ForgotPasswordPage} />
            <GuestRoute location={location} path="/reset/:uid/:token" component={ResetPasswordPage} />
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
