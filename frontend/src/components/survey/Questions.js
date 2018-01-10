import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import SingleQuestion from './SingleQuestion'

class Questions extends React.Component {

  constructor(){
    super();
    this.state = {
      answers: []
    };
  }

  /**
  * TODO keep the answers state through routing
  */
  addAnswer(newAnswer){
    this.setState({answers: [...this.state.answers, newAnswer ]})
    //console.log(this.state.answers)
  }

  render() {

    let numberOfQuestions = this.props.questions.length;

    return(
      <div>
        <BrowserRouter>
            <div>
              {this.props.questions.map(
                (question) =>
                <Route key={question.id} path= {"/survey/" + question.id} render={
                    (props) =>
                    <SingleQuestion {...props} question={question}
                      numberOfQuestions={numberOfQuestions}
                      answer={this.addAnswer.bind(this)}/>
                }/>
              )}
            </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Questions;
