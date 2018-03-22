import React from "react";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { resetPasswordRequest } from "../actions/registerActions";

class ForgotPasswordPage extends React.Component {

  state = {
    success: false
  };

  componentDidMount() {
    document.title = "Password Reset"
  }

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              {this.state.success ? (
                <Message success>Email has been sent. Check your inbox.</Message>
              ) : (
                <ForgotPasswordForm submit={this.submit}/>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
