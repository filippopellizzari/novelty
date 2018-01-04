import React from 'react';
import {Button, ProgressBar} from 'react-bootstrap';

class SingleQuestion extends React.Component {

    constructor(){
      super();
      this.state = {
        'selectedOption': '',
        'isValid': false
      };
    }

    onOptionSelect (e){
      this.setState({selectedOption: e.target.value})
      this.setState({isValid: true})
    }

    keepAnswer(){
      this.props.answer(this.state.selectedOption)
    }

    render() {

      var nextButton;

      if(this.props.question.id === this.props.numberOfQuestions){
        nextButton = <Button className="submit" bsStyle="primary" bsSize="lg"
          href="/thanks"
          hidden={!this.state.isValid}
          onClick={this.keepAnswer.bind(this)}>Submit</Button>
      } else{
        nextButton = <Button className="nextButton" bsStyle="primary" bsSize="lg"
          href={"/survey/" + (+this.props.question.id + 1).toString()}
          hidden={!this.state.isValid}
          onClick={this.keepAnswer.bind(this)}>Next</Button>
      }

      return(
        <div>
          <h5>{this.props.question.text}</h5>
          <div className="options">
            {this.props.question.options.map(
              (option) =>
              <div key={option.id}>
                <input
                  type="radio"
                  name="{option.id}"
                  value={option.name}
                  onChange={this.onOptionSelect.bind(this)}
                /> {option.name}
              </div>
            )}
          </div>
          <div className="progressBar" style={{marginTop:30}}>
            <ProgressBar
              now={(this.props.question.id/this.props.numberOfQuestions)*100}
            />
          </div>
          <div style={{marginTop:30, textAlign:'center'}}>
            {nextButton}
          </div>

        </div>


      )
    }
}

export default SingleQuestion;
