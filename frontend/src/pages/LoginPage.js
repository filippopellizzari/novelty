import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {  Divider } from 'semantic-ui-react'
import axios from 'axios';

import LoginForm from '../forms/LoginForm';
import FacebookLogin from '../components/socialLogin/FacebookLogin';
import GoogleLogin from '../components/socialLogin/GoogleLogin';
import { login, socialLogin} from "../actions/authActions";
import { signup, socialSignup } from "../actions/registerActions";
import { getProfile }   from "../actions/stateActions";


class LoginPage extends React.Component{

  state = {
    startingPage: ""
  };

  componentDidMount(){
    document.title = "Login";
    if(localStorage.socialSignup==="true"){
      this.props.history.push("/socialSignup")
    }
    if(localStorage.normalSignup==="true"){
      this.props.history.push("/completeSignup")
    }

    axios.get("/api/surveys/" + localStorage.getItem("survey_id") + "/")
          .then((res)  =>{
            localStorage.setItem('moviesToSelect', res.data.input_length);
    });
  }

  submit = (data) => {
    localStorage.setItem('email', data.email);

    this.props.getProfile(data.email)
      .then( (res) =>
      this.setState({startingPage:res.data.page})
      )
    return this.props.login(data).then(() => this.props.history.push("/"+this.state.startingPage))
  }

  socialSubmit = (data) =>{
    localStorage.setItem('token', data.accessToken);
    this.props.socialSignup(data)
      .then(() => this.props.history.push("/socialSignup"))
      .catch(
        (err) => {
          this.props.socialLogin(data)
          localStorage.removeItem('password');
          this.props.getProfile(data.email)
            .then( (res) => this.props.history.push("/"+res.data.page));
        }
      );
  }

  render(){
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              <FacebookLogin socialSubmit={this.socialSubmit}/>
              <GoogleLogin socialSubmit={this.socialSubmit}/>
              <Divider horizontal>Or</Divider>
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
  login: PropTypes.func.isRequired,
  socialLogin: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  socialSignup: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

export default connect(null, { login, socialLogin, signup, socialSignup, getProfile})(LoginPage);
