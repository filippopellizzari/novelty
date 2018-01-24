import React from 'react';
import { Button, Progress } from 'semantic-ui-react';

import SingleQuestion from './SingleQuestion';

class Questions extends React.Component {

  state = {
    questionNumber: 1,
    isValid: false,
    currentAnswer:"",
    responses:[]
  };

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
  }

  nextQuestion = () => {
    this.addResponse();
    this.setState({questionNumber: this.state.questionNumber + 1});
    this.setState({isValid: false});
  }

  onSubmit = () => {
    this.addResponse();
    this.setState({questionNumber: this.state.questionNumber + 1});
  }


  render() {
    const numberOfQuestions = this.props.questions.length

    const { questionNumber, isValid} = this.state;

    const question = this.props.questions.map(
      (question) =>
          <SingleQuestion
            key={question.id}
            question={question}
            display={question.id === questionNumber}
            answer={this.currentAnswer}
            onValidChange={this.isValid}
          />
    )

    var nextButton;
    if(questionNumber === numberOfQuestions){
      nextButton =
      <Button primary disabled={!isValid} onClick={this.nextQuestion}>
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
        <div style={{marginTop:30, textAlign:'center'}}>
          {nextButton}
        </div>
      </div>
    );
  }
}

export default Questions;
