import React from "react";
import SignupForm from "../forms/SignupForm";


class SignupPage extends React.Component {

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              <SignupForm/>
              <div className="card-footer text-muted text-center">
                Already have an account? <a href="/login">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SignupPage;
