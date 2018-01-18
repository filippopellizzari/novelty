import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";

import InlineError from "../messages/InlineError";

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      new_password1: "",
      new_password2: "",
      uid: this.props.uid,
      token: this.props.token
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
      console.log(this.state.data);
      this.props.submit(this.state.data)
      .catch(err =>
        this.serverErrors(err.response.data)
      );
    }
  };

  serverErrors = data => {
    const errors = {};
    if(data.new_password2){
      errors.new_password1 = data.new_password2.toString();
      this.setState({errors});
      this.setState({loading: false});
      this.setState({data: {...this.state.data, new_password2:"" } });
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.new_password1) errors.new_password1 = "Can't be blank.";
    if (data.new_password1 !== data.new_password2)
      errors.new_password2 = "Passwords don't match.";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.new_password1}>
          <label htmlFor="new_password1">New Password</label>
          <input
            type="password"
            id="new_password1"
            name="new_password1"
            value={data.new_password1}
            onChange={this.onChange}
          />
          {errors.new_password1 && <InlineError text={errors.new_password1} />}
        </Form.Field>

        <Form.Field error={!!errors.new_password2}>
          <label htmlFor="new_password2">
            Confirm your new password
          </label>
          <input
            type="password"
            id="new_password2"
            name="new_password2"
            value={data.new_password2}
            onChange={this.onChange}
          />
          {errors.new_password2 && (
            <InlineError text={errors.new_password2} />
          )}
        </Form.Field>

        <Button primary fluid>Reset</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired
};

export default ResetPasswordForm;
