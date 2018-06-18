import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { RingLoader } from 'react-spinners';

import RecList from '../components/survey/RecList';
import Questions from '../components/survey/Questions';
import { recommend } from "../actions/recsysActions";
import { submitSurvey } from "../actions/surveyActions";
import {updatePageProfile,deleteAnswers,
  updateQuestionNumberProfile,updateValidSurveyProfile} from "../actions/stateActions";


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
      loadingA:true,
      loadingB:true,
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
      var selected = JSON.parse(localStorage.getItem("selected"));

      if(localStorage.recs_status==='given'){
          this.setState({recsA:JSON.parse(localStorage.getItem("recsA")), loadingA:false})
          if(res.data.survey_type==="Within-subject"){
            this.setState({recsB:JSON.parse(localStorage.getItem("recsB")), loadingB:false})
          }else{
            this.setState({loadingB:false})
          }
      }else{
          this.props.recommend({
            algorithm:res.data.algorithms[0],
            selected_items:selected,
            reclist_length:res.data.reclist_length
            })
            .then(
              (res) => {
                localStorage.setItem('recsA', JSON.stringify(res.data));
                this.setState({recsA:res.data, loadingA:false})
              }
            )
            .catch(
              (error) => alert("Too many requests! Please, refresh the page only once.")
            )

          if(res.data.survey_type==="Within-subject"){
            this.props.recommend({
              algorithm:res.data.algorithms[1],
              selected_items:selected,
              reclist_length:res.data.reclist_length
              })
              .then(
                (res) => {
                  localStorage.setItem('recsB', JSON.stringify(res.data));
                  localStorage.setItem('recs_status', 'given');
                  this.setState({recsB:res.data, loadingB:false})
                }
              )
              .catch(
                (error) => alert("Too many requests! Please, refresh the page only once.")
              )
            localStorage.setItem('listA', res.data.algorithms[0]["rec_name"])
            localStorage.setItem('listB', res.data.algorithms[1]["rec_name"])
          }else{
            this.setState({loadingB:false})
            localStorage.setItem('recs_status', 'given');
            localStorage.setItem('list', res.data.algorithms[0]["rec_name"])
          }
      }
    })
  }

  submit = responses =>{
    this.props.updatePageProfile({email:localStorage.email,page:"thanks"})
    this.props.updateQuestionNumberProfile({email:localStorage.email,questionNumber:1})

    const data = {};
    data.is_valid = this.isSurveyValid(responses);
    data.email = localStorage.email;
    data.survey_id = parseInt(this.state.survey_id, 10);
    data.responses = responses;

    if(this.state.survey_type==="Between-subject"){
      data.algorithms = localStorage.list
      localStorage.removeItem('list');
    }else{
      data.algorithms = "A: "+ localStorage.listA + ", B: " + localStorage.listB
      localStorage.removeItem('listA');
      localStorage.removeItem('listB');
    }

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

  render() {
    const { survey_type, recsA, recsB, loadingA, loadingB } = this.state
    this.props.updatePageProfile({email:localStorage.email,page:"survey"})
    var reclists = survey_type === "Within-subject" ?
    <div>
      <div>
        <RecList recs={recsA} name="A"/>
      </div>
      <div style={{marginTop:20}}>
        <RecList recs={recsB} name="B"/>
      </div>
    </div>
    : <RecList recs={recsA} name=""/>

    return (
      <div className="container">
        {loadingA || loadingB ? (
        <div className="container" style={{display: 'flex', justifyContent: 'center', marginTop: 250}}>
            <RingLoader
              color={'#2c85d0'}
              loading={loadingA || loadingB}
              size={100}
            />
        </div>):(
        <Row>
          <Col xs={12} md={7} style={{marginTop:50}}>
            {reclists}
          </Col>
          <Col xs={6} md={4} style={{marginLeft:50, marginTop:60}}>
            <Questions questions={this.state.questions} submit={this.submit}/>
          </Col>
        </Row>)}
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
