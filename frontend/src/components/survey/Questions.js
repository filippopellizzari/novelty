import React from 'react';
import { Button, Progress } from 'semantic-ui-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleQuestion from './SingleQuestion';
import {getProfile,updateQuestionNumberProfile,
  saveAnswers,getAnswers} from "../../actions/stateActions";

class Questions extends React.Component {

  state = {
    questionNumber: 1,
    isValid: false,
    currentAnswer:"",
    responses:[]
  };

  componentDidMount(){
    this.props.getProfile(localStorage.email)
      .then( (res) => this.setState({questionNumber:res.data.questionNumber}));

    this.props.getAnswers(localStorage.email)
      .then((res)=>{
        for (var key in res.data){
          const response = {}
          response.question = res.data[key].question
          response.answer = res.data[key].answer
          this.setState({
            responses: [...this.state.responses, response]
          })
        }
      })
  }

  currentAnswer = (newAnswer) =>
    this.setState({currentAnswer:newAnswer})

  isValid = () =>
    this.setState({isValid:true})

  addResponse = () => {
    const response = {}
    const { questionNumber, currentAnswer, responses } = this.state;
    response.question = this.props.questions[questionNumber-1].text;
    response.answer = currentAnswer;
    this.setState({
      responses: [...responses, response]
    })
    this.props.saveAnswers({
      email:localStorage.email,
      survey_id:localStorage.survey_id,
      responses:[response]
    })

  }

  nextQuestion = () => {
    this.addResponse();
    this.setState({questionNumber: this.state.questionNumber + 1});
    this.props.updateQuestionNumberProfile({email:localStorage.email,
        questionNumber:this.state.questionNumber+1})
    this.setState({isValid: false});
  }

  onSubmit = () => {
    this.addResponse();
    this.setState({questionNumber: this.state.questionNumber + 1});
  }


  render() {

    const numberOfQuestions = this.props.questions.length > 0 ?
    this.props.questions.length : 1000000
    const { questionNumber, isValid} = this.state;

    const question = this.props.questions.map(
      (question, index) =>
          <SingleQuestion
            key={index}
            order={index+1}
            question={question}
            display={index+1 === questionNumber}
            answer={this.currentAnswer}
            onValidChange={this.isValid}
          />
    )

    var nextButton;
    if(questionNumber === numberOfQuestions){
      nextButton =
      <Button primary disabled={!isValid} onClick={this.onSubmit}>
        Submit
      </Button>
    } else {
      nextButton =
      <Button primary disabled={!isValid} onClick={this.nextQuestion}>
        Next
      </Button>
    }

    if(questionNumber > numberOfQuestions){
      this.props.submit(this.state.responses);
    }

    return(
      <div>
        <div>
          {question}
        </div>
        <div className="progressBar" style={{marginTop:30}}>
          <Progress
            percent={(questionNumber/numberOfQuestions)*100}
            color='blue'
          />
        </div>
        <div className="container" style={{textAlign:'center'}}>
          {nextButton}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  getProfile: PropTypes.func.isRequired,
  updateQuestionNumberProfile: PropTypes.func.isRequired,
  saveAnswers: PropTypes.func.isRequired,
  getAnswers: PropTypes.func.isRequired,
};

export default connect(null, {getProfile,
  updateQuestionNumberProfile,saveAnswers,getAnswers})(Questions);
