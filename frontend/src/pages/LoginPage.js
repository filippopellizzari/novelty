import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import LoginForm from '../forms/LoginForm';
import {login} from  '../actions/auth'
import {authErrors, isAuthenticated} from '../reducers'

const LoginPage = (props) => {
  if(props.isAuthenticated) {
    return (
      <Redirect to='/welcome' />
    )
  } else {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              <LoginForm {...props}/>
              <div className="card-footer text-muted text-center">
                <Link to="/forgot">Forgot Password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (username, password) => {
    dispatch(login(username, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
