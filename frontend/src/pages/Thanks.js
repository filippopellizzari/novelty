import React from 'react';
import admin from '../data/admin.json'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {updateQuestionNumberProfile,updatePageProfile} from "../actions/stateActions";


class Thanks extends React.Component {

  componentDidMount() {
    document.title = "Thanks"
    this.props.updatePageProfile({email:localStorage.email,page:"welcome"})
  }

  render() {
    this.props.updatePageProfile({email:localStorage.email,page:"welcome"})
    this.props.updateQuestionNumberProfile({email:localStorage.email,questionNumber:1})
    var survey_code = admin.crowdflower
    ? <div className="card">
        <div className="card-body">
          <h3>Your Survey Code is</h3>
          <h2>{admin.survey_code}</h2>
          <h3>(Copy and submit)</h3>
        </div>
      </div>
    : null

    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container" style={{textAlign:'center'}}>
            <h1>Your response has been registered.</h1>
            <h3 className="display-3">Thank you!</h3>
          </div>
        </div>
        <div className="container" style={{textAlign:'center'}}>
          {survey_code}
        </div>
      </div>
    );
  }
}

Thanks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  updateQuestionNumberProfile: PropTypes.func.isRequired,
  updatePageProfile: PropTypes.func.isRequired,
};

export default connect(null, {updateQuestionNumberProfile,updatePageProfile})(Thanks);
