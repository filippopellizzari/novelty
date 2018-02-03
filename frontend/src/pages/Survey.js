import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';


import RecList from '../components/survey/RecList';
import Questions from '../components/survey/Questions';
import recsA from '../data/recsA.json';
import recsB from '../data/recsB.json';
import { submitSurvey } from "../actions/surveyActions";
import admin from '../data/admin.json';

class Survey extends React.Component {

  constructor(){
    super();
    this.state = {
      questions:[],
      survey_id:""
    };
  }

  componentDidMount(){
    axios.get("/api/surveys/" + admin.survey_id + "/")
      .then((response)  => this.setState({
        questions:response.data.questions,
        survey_id:response.data.survey_id
      }))
      .catch( (err) => console.log(err));
  }

  submit = responses =>{
    const data = {};
    data.email = localStorage.email;
    data.survey_id = this.state.survey_id;
    data.responses = responses;
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
            <Questions questions={this.state.questions} submit={this.submit}/>
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



export default connect(null, {submitSurvey})(Survey);
