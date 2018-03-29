import React from 'react';
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {updateQuestionNumberProfile,updatePageProfile,getProfile} from "../actions/stateActions";
import admin from '../data/admin.json'

class Thanks extends React.Component {

  state = {
    valid_survey: false,
    survey_code:""
  };

  componentDidMount() {
    document.title = "Thanks"
    localStorage.removeItem('survey');
    localStorage.setItem('thanks',"survey completed");
    this.props.updatePageProfile({email:localStorage.email,page:"thanks"})
    this.props.getProfile(localStorage.email)
        .then( (res) => this.setState({
          valid_survey:res.data.valid_survey,
          survey_code:res.data.survey_code
        }));
  }

  render() {
    const {valid_survey, survey_code} = this.state
    var message = valid_survey===true ?
    <Message success>
      <h3>Your Survey Code is</h3>
      <h2>{survey_code}</h2>
      <h3>(Copy and submit)</h3>
    </Message>
    :<Message negative>
      <h3>Your survey is not valid, because it is inconsistent.</h3>
      <h3>The Survey Code is not available.</h3>
    </Message>

    this.props.updatePageProfile({email:localStorage.email,page:"thanks"})
    this.props.updateQuestionNumberProfile({email:localStorage.email,questionNumber:1})

    var surveyCode = admin.crowdflower
    ? <div className="card">
        {message}
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
          {surveyCode}
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
  getProfile: PropTypes.func.isRequired,
};

export default connect(null, {updateQuestionNumberProfile,updatePageProfile,getProfile})(Thanks);
