import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Message, Button } from "semantic-ui-react";

import ResetPasswordForm from "../forms/ResetPasswordForm";
import { validateToken, resetPassword } from "../actions/registerActions";

class ResetPasswordPage extends React.Component {

  state = {
    success: false
  };

  componentDidMount() {
    const uid = this.props.match.params.uid;
    const token = this.props.match.params.token;
    this.props
      .validateToken({"uid":uid, "token":token} )
      .catch(() => this.props.history.push("/forgot"));
  }

  submit = password =>
    this.props
      .resetPassword(password)
      .then(() => this.setState({ success: true }));


  render() {
    const { success } = this.state;
    const uid = this.props.match.params.uid;
    const token = this.props.match.params.token;

    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              {!success &&
                <ResetPasswordForm
                  submit={this.submit}
                  uid={uid}
                  token={token}
                />}
              {success &&
                <div>
                  <Message success> The password has been reset successfully.</Message>
                  <Button primary fluid href="/login">Login</Button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,

};

export default connect(null, { validateToken, resetPassword })(ResetPasswordPage);
