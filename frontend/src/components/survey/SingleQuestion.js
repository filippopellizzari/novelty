import React from 'react';
import { Button, Form, Checkbox, Progress } from 'semantic-ui-react';

class SingleQuestion extends React.Component {

    constructor(){
      super();
      this.state = {
        'selectedOption': '',
        'isValid': false
      };
      this.onChange = this.onChange.bind(this);
      this.keepAnswer = this.keepAnswer.bind(this);
    }

    onChange (e, data){
      this.setState({selectedOption: data.value})
      this.setState({isValid: true})
    }

    keepAnswer(){
      this.props.answer(this.state.selectedOption)
    }

    render() {

      var nextButton;

      if(this.props.question.id === this.props.numberOfQuestions){
        nextButton =
        <Button
          primary
          href="/thanks"
          disabled={!this.state.isValid}
          onClick={this.keepAnswer}>
          Submit
        </Button>
      } else{
        nextButton =
        <Button
          primary
          href={"/survey/" + (this.props.question.id + 1).toString()}
          disabled={!this.state.isValid}
          onClick={this.keepAnswer}>
          Next
        </Button>
      }

      return(
        <div>
          <Form>
            <Form.Field>
              <h3>{this.props.question.id + ". "}{this.props.question.text}</h3>
            </Form.Field>
            {this.props.question.options.map(
              (option) =>
              <Form.Field key={option.id}>
                <Checkbox
                  radio
                  label={option.name}
                  name="{option.id}"
                  value={option.name}
                  checked={this.state.selectedOption === option.name}
                  onChange={this.onChange}
                />
              </Form.Field>
            )}
          </Form>

          <div className="progressBar" style={{marginTop:30}}>
            <Progress
              percent={(this.props.question.id/this.props.numberOfQuestions)*100}
              color='blue'
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
