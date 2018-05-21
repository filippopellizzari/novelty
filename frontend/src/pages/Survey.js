import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

import RecList from '../components/survey/RecList';
import Questions from '../components/survey/Questions';
//import recsA from '../data/recsA.json';
//import recsB from '../data/recsB.json';
import { recommend } from "../actions/algosActions";
import { submitSurvey } from "../actions/surveyActions";
import {updatePageProfile,deleteAnswers,
  updateQuestionNumberProfile,updateValidSurveyProfile} from "../actions/stateActions";
//import admin from '../data/admin.json';

class Survey extends React.Component {

  constructor(){
    super();
    this.state = {
      questions:[],
      algorithms:[],
      recsA:[],
      recsB:[],
      survey_id:"",
      survey_type:"",
    };
  }

  componentDidMount(){
    document.title = "Survey"
    localStorage.setItem('survey', "survey in progress");
    if(localStorage.thanks !== undefined){
      this.props.history.push("/thanks")
    }
    axios.get("/api/surveys/" + localStorage.getItem("survey_id") + "/")
      .then((res)  =>{
        this.setState({
        questions:res.data.questions,
        algorithms:res.data.algorithms,
        survey_id:res.data.survey_id,
        survey_type:res.data.survey_type
      })
      var models = this.selectRandomAlgorithms(res.data.algorithms)
      var selected = JSON.parse(localStorage.getItem("selected"));

      this.props.recommend({input_model_id:models[0],selected_items:selected})
        .then((res) => this.setState({recsA:res.data}))
      if(res.data.survey_type==="Within-subject"){
        this.props.recommend({input_model_id:models[1],selected_items:selected})
          .then((res) => this.setState({recsB:res.data}))
      }
      })
      .catch( (err) => console.log(err));
  }

  submit = responses =>{
    this.props.updatePageProfile({email:localStorage.email,page:"thanks"})
    this.props.updateQuestionNumberProfile({email:localStorage.email,questionNumber:1})

    const data = {};
    data.is_valid = this.isSurveyValid(responses);
    data.email = localStorage.email;
    data.survey_id = parseInt(this.state.survey_id, 10);
    data.responses = responses;

    this.props.updateValidSurveyProfile({email:localStorage.email,valid_survey:data.is_valid})
      .then( () => {
        this.props.deleteAnswers(localStorage.email)
          .then( () => {
            this.props.submitSurvey(data)
              .then(() => {
                this.props.history.push("/thanks")
              })
            })
        });
  }

  isSurveyValid(responses){
    for (var i=0; i<responses.length; i++){
      for (var j=i+1; j<responses.length; j++){
        if(responses[j].question===responses[i].question){
          if(responses[j].answer!==responses[i].answer){
            return false
          }
        }
      }
    }
    return true
  }

  selectRandomAlgorithms(algorithms){
    var res = []
    var models = algorithms.map(
      (algorithm) => algorithm.id
    )
    var modelA = models[Math.floor(Math.random() * models.length)];
    res[0] = modelA
    var index = models.indexOf(modelA);
    if (index > -1) {
      models.splice(index, 1);
    }
    var modelB = models[Math.floor(Math.random() * models.length)];
    res[1] = modelB
    return res
  }

  render() {
    const { survey_type, recsA, recsB } = this.state
    this.props.updatePageProfile({email:localStorage.email,page:"survey"})
    var reclists = survey_type === "Within-subject" ?
    <div>
      <RecList recs={recsA} name="A"/>
      <RecList recs={recsB} name="B"/>
    </div>
    : <RecList recs={recsA} name=""/>

    return (
      <div className="container">
        <Row>
          <Col xs={12} md={7} style={{marginTop:30}}>
            {reclists}
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
  submitSurvey: PropTypes.func.isRequired,
  updatePageProfile: PropTypes.func.isRequired,
  deleteAnswers: PropTypes.func.isRequired,
  updateQuestionNumberProfile: PropTypes.func.isRequired,
  updateValidSurveyProfile: PropTypes.func.isRequired,
  recommend: PropTypes.func.isRequired,
};

export default connect(null, {submitSurvey,updatePageProfile,
  deleteAnswers,updateQuestionNumberProfile,updateValidSurveyProfile, recommend})(Survey);
