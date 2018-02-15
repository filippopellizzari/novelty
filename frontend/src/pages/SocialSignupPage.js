import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import SocialSignupForm from "../forms/SocialSignupForm";
import {socialLogin} from "../actions/authActions";


class SocialSignupPage extends React.Component {

  submit = data => {
    console.log(data);
    this.props.socialLogin(data);
    this.props.history.push("/welcome");
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              <h3>We need some more information about you</h3>
              <SocialSignupForm submit={this.submit}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SocialSignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  socialLogin: PropTypes.func.isRequired
};

export default connect(null, {socialLogin})(SocialSignupPage);
