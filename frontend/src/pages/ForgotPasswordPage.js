import React from "react";
import { Message } from "semantic-ui-react";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

class ForgotPasswordPage extends React.Component {
  state = {
    success: false
  };


  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              {this.state.success ? (
                <Message>Email has been sent.</Message>
              ) : (
                <ForgotPasswordForm />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ForgotPasswordPage;
