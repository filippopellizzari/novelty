import React from "react";
import { Form, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";

import InlineError from "../messages/InlineError";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err =>
          this.serverErrors(err.response.data)
        );

    }
  };

  serverErrors = data => {
    const errors = {};
    errors.email = data.email.toString();
    this.setState({errors});
    this.setState({loading: false});
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email.";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <h4>Enter your email address to reset the password.</h4>
        <Form.Field error={!!errors.email}>
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button primary fluid>Submit</Button>
      </Form>
    );
  }
}


export default ForgotPasswordForm;
