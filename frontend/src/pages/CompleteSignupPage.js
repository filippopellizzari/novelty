import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import DemographicForm from "../forms/DemographicForm";
import {completeDemographic} from "../actions/registerActions";
import {login} from "../actions/authActions";
import {createProfile} from "../actions/stateActions";

class CompleteSignupPage extends React.Component {

  submit = data => {
    data.email = localStorage.email;
    data.password = localStorage.password;
    this.props.completeDemographic(data)
      .then(()=>{
        this.props.login({email:data.email,password:data.password})
        .then(()=>{
          localStorage.removeItem('password');
          this.props.createProfile({email:data.email,page:"welcome",questionNumber:1})
          this.props.history.push("/welcome");
        });
      }
    );
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              <h3>We need some more information about you</h3>
              <DemographicForm submit={this.submit}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompleteSignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  completeDemographic: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, {completeDemographic, login, createProfile})(CompleteSignupPage);
