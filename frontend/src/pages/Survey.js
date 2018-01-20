import React from 'react';
import {Row, Col} from 'react-bootstrap'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import RecList from '../components/survey/RecList'
import Questions from '../components/survey/Questions'
import recsA from '../data/recsA.json'
import recsB from '../data/recsB.json'
import survey from '../data/survey_between.json'
import { submitSurvey } from "../actions/surveyActions";


class Survey extends React.Component {

  submit = answers =>{
    const data = {};
    data.survey_id = survey.id;
    //data.answers = answers;
    this.props.submitSurvey(data)
      .then(() => this.props.history.push("/thanks"))
      .catch( (err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col xs={12} md={7} style={{marginTop:30}}>
            <RecList recs={recsA} name="A"/>
            <RecList recs={recsB} name="B"/>
          </Col>
          <Col xs={6} md={4} style={{marginLeft:50, marginTop:60}}>
            <Questions questions={survey.questions} submit={this.submit}/>
          </Col>
        </Row>
      </div>
    );
  }
}

Survey.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  submitSurvey: PropTypes.func.isRequired
};


export default connect(null, { submitSurvey })(Survey);
