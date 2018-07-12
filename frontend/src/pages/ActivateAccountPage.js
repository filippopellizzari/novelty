import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Message, Button } from "semantic-ui-react";

import { validateToken } from "../actions/registerActions";

class ActivateAccountPage extends React.Component {

  componentDidMount() {
    document.title = "Signup"
    const uid = this.props.match.params.uid;
    const token = this.props.match.params.token;
    this.props
      .validateToken({"uid":uid, "token":token} )
      .catch(() => this.props.history.push("/signup"));
    localStorage.setItem('normalSignup', "true")
  }

  render() {

    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
                <div>
                  <Message success> Your account is now active.</Message>
                  <Button primary fluid href="/completeSignup">Next</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ActivateAccountPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
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

export default connect(null, { validateToken })(ActivateAccountPage);
