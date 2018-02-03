import React from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import Validator from "validator";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";
import { GENDER_OPTIONS, AGE_OPTIONS, COUNTRY_OPTIONS } from "./options";
import { getCountryName } from "./country";

class SignupForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      gender:"",
      age:"",
      country:""
    },
    passwordConfirmation: "",
    loading: false,
    errors: {},
    serverErrors: {},
  };

  onChange = e =>
    this.setState(
      {...this.state, data: { ...this.state.data, [e.target.name]: e.target.value }}
    );

  onChangePasswordConfirm = e =>
    this.setState({passwordConfirmation: e.target.value});

  onChangeGender = (e,data) =>
    this.setState(
      {...this.state, data: { ...this.state.data, gender: data.value }}
    );
  onChangeAge = (e,data) =>
    this.setState(
      {...this.state, data: { ...this.state.data, age: data.value }}
    );
  onChangeCountry = (e,data) =>
    this.setState(
      {...this.state,
        data: { ...this.state.data, country: getCountryName(data.value.toUpperCase()) }}
    );

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

    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid email.";
    }
    if (!data.email) {
      errors.email = "Can't be blank.";
    }
    if (data.password.length < 8) {
      errors.password = "This password is too short. It must contain at least 8 characters.";
    }
    if (!data.password) {
      errors.password = "Can't be blank.";
    }
    if (data.password !== this.state.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords don't match.";
    }
    if (!data.gender) {
      errors.gender = "Required.";
    }
    if (!data.age) {
      errors.age = "Required.";
    }
    if (!data.country) {
      errors.country = "Required.";
    }

    return errors;
  };

  render() {
    const { data, passwordConfirmation, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
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

        <Form.Field error={!!errors.gender}>
          <label htmlFor="gender">Gender</label>
            <Dropdown
              selection
              options={GENDER_OPTIONS}
              onChange={this.onChangeGender}
            />
          {errors.gender && <InlineError text={errors.gender} />}
        </Form.Field>

        <Form.Field error={!!errors.age}>
          <label htmlFor="age">Age</label>
            <Dropdown
              selection
              options={AGE_OPTIONS}
              onChange={this.onChangeAge}
            />
          {errors.age && <InlineError text={errors.age} />}
        </Form.Field>

        <Form.Field error={!!errors.country}>
          <label htmlFor="country">Country</label>
            <Dropdown
              search
              selection
              options={COUNTRY_OPTIONS}
              onChange={this.onChangeCountry}
            />
          {errors.country && <InlineError text={errors.country} />}
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
