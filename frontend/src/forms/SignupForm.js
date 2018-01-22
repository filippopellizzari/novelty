import React from "react";
import { Form, Button} from "semantic-ui-react";
import Validator from "validator";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";

class SignupForm extends React.Component {
  state = {
    data: {
      username:"",
      email: "",
      password: ""
    },
    passwordConfirmation: "",
    loading: false,
    errors: {},
    serverErrors: {},
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onChangePasswordConfirm = e =>
    this.setState({passwordConfirmation: e.target.value});

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

    if(data.username) {
      errors.username = "This username already exists. Please use a different one."
    }
    if(data.email) {
      errors.email = "This email has already been used."
    }
    if(data.password) {
      errors.password = data.password.toString()
    }
    this.setState({errors});
    this.setState({loading: false});
  }

  validate = data => {
    const errors = {};

    if (!data.username) {
      errors.username = "Can't be blank.";
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid email.";
    }
    if (!data.password) {
      errors.password = "Can't be blank.";
    }
    if (data.password.length < 8) {
      errors.password = "This password is too short. It must contain at least 8 characters.";
    }
    if (data.password !== this.state.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords don't match.";
    }

    return errors;
  };

  render() {
    const { data, passwordConfirmation, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.username}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={this.onChange}
          />
        {errors.username && <InlineError text={errors.username} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Minimum length of 8 characters"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Form.Field error={!!errors.passwordConfirmation}>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={this.onChangePasswordConfirm}
          />
          {errors.passwordConfirmation &&
            <InlineError text={errors.passwordConfirmation} />}
        </Form.Field>
        <Button primary fluid>Signup</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
