import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

class SingleQuestion extends React.Component {

    constructor(){
      super();
      this.state = {
        'selectedOption': ""
      };
      this.onChange = this.onChange.bind(this);
    }




    onChange(e, data){
      this.setState({selectedOption: data.value});
      this.props.onValidChange(true);
      this.props.answer(data.value);
    }


    render() {
      const question = this.props.question;
      const order = this.props.order;
      const { selectedOption } = this.state;
      var display = (this.props.display) ? " " : "none";


      return(
        <div style={{display:display}}>
          <Form>
            <Form.Field>
              <h3>{order + ". "}{question.text}</h3>
            </Form.Field>
            {question.options.map(
              (option) =>
              <Form.Field key={option.option_id}>
                <Checkbox
                  radio
                  label={option.text}
                  name="{option.option_id}"
                  value={option.text}
                  checked={selectedOption === option.text}
                  onChange={this.onChange}
                />
              </Form.Field>
            )}
          </Form>
        </div>
      )
    }
}

export default SingleQuestion;
