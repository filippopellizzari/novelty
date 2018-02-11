import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Icon } from 'semantic-ui-react'

import SocialButton from '../components/SocialButton';
import LoginForm from '../forms/LoginForm';
import { login } from "../actions/authActions";

class LoginPage extends React.Component{

  submit = (data) => {
    localStorage.setItem('email', data.email);
    return this.props.login(data).then(() => this.props.history.push("/welcome"));
  }

  handleSocialLogin = (user) => {
    console.error(user);
    //localStorage.setItem('email', (user.profile.email));
  }

  handleSocialLoginFailure = (err) => {
    console.error(err)
  }


  render(){

    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              <SocialButton
                color='facebook'
                provider='facebook'
                appId='1992158391108754'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
              <Icon name='facebook'/>
              Login with Facebook
              </SocialButton>

              <SocialButton
                color='google plus'
                provider='google'
                appId='343367764215-q26jog9e7ubf2gn5lgc3c3ei2dilm3kt.apps.googleusercontent.com'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
              <Icon name='google plus'/>
              Login with Google
              </SocialButton>

              <LoginForm submit={this.submit}/>
              <div className="card-footer text-muted text-center">
                <Link to="/forgot">Forgot Password?</Link>
              </div>
              <div className="card-footer text-muted text-center">
                New to Novelty Survey? <Link to="/signup">Signup now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
