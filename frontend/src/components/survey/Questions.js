import React from 'react';
import { Button, Progress } from 'semantic-ui-react';

import SingleQuestion from './SingleQuestion';

class Questions extends React.Component {

  state = {
    questionNumber: 1,
    isValid: false,
    currentAnswer:"",
    answers:[]
  };

  currentAnswer = (newAnswer) =>
    this.setState({currentAnswer:newAnswer})

  isValid = () =>
    this.setState({isValid:true})

  addAnswer = () => {
    const answer = {}
    answer.question_number = this.state.questionNumber;
    answer.answer_text = this.state.currentAnswer;
    this.setState({
      answers: [...this.state.answers, answer]
    })
  }

  nextQuestion = () => {
    this.addAnswer();
    this.setState({questionNumber: this.state.questionNumber + 1});
    this.setState({isValid: false});
  }

  onSubmit = () => {
    this.addAnswer();
    this.props.submit(this.state.answers);
  }

  render() {

    const numberOfQuestions = this.props.questions.length;
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
      <Button primary disabled={!isValid} onClick={this.onSubmit}>
        Submit
      </Button>
    } else {
      nextButton =
      <Button primary disabled={!isValid} onClick={this.nextQuestion}>
        Next
      </Button>
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
