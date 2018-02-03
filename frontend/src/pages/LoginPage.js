import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import LoginForm from '../forms/LoginForm';
import { login } from "../actions/authActions";

class LoginPage extends React.Component{

  submit = (data) => {
    localStorage.setItem('email', data.email);
    return this.props.login(data).then(() => this.props.history.push("/welcome"));
  }


  render(){
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
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
