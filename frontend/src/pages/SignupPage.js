import React from "react";
import { connect } from 'react-redux';
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";

import SignupForm from "../forms/SignupForm";
import { signup, completeDemographic } from "../actions/registerActions";


class SignupPage extends React.Component {

  state = {
    success: false
  };

  componentDidMount() {
    document.title = "Signup"
  }

  submit = data =>
    this.props.signup(data)
      .then(() => this.setState({ success: true }));


  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              {this.state.success ? (
                <Message success>
                  <p>Email has been sent to verify you account.</p>
                  <p>Check your inbox.</p>
                </Message>
              ) : (
                <div>
                  <SignupForm submit={this.submit}/>
                  <div className="card-footer text-muted text-center">
                    Already have an account? <a href="/login">Log in</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired,
  completeDemographic: PropTypes.func.isRequired
};

export default connect(null, { signup, completeDemographic })(SignupPage);
