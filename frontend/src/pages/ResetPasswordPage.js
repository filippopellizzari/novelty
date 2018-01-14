import React from "react";
import { Message } from "semantic-ui-react";
import ResetPasswordForm from "../forms/ResetPasswordForm";

class ResetPasswordPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  submit = data =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push("/login"));

  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;

    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              {loading && <Message>Loading</Message>}
              {!loading &&
              success && <ResetPasswordForm submit={this.submit} token={token} />}
              {!loading && !success && <Message>Invalid Token</Message>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ResetPasswordPage;
