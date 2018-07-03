import React from "react";
import axios from "axios";
import { Form, Button, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";
import {GENDER_OPTIONS, AGE_OPTIONS} from "./options";
import { COUNTRY_OPTIONS } from "./options";
import { getCountryName } from "./country";

class DemographicForm extends React.Component {
  state = {
    data: {
      gender:"",
      age:"",
      country:""
    },
    loading: false,
    auto_country:true,
    errors: {},
    serverErrors: {},
  };

  componentDidMount(){
    axios.get("http://api.ipstack.com/check?access_key=04d72c168811712c203370b8f269da1b&format=1")
      .then((res)  =>{
        if(res.data.country_name!==null){
          this.setState(
            {...this.state,
              data: { ...this.state.data, country: res.data.country_name }}
          )
        }else{
          this.setState(
            {auto_country:false}
          )
        }
      }
      )
  }

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
    }
  };

  validate = data => {
    const errors = {};

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
    const { errors, loading} = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
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

        {this.state.auto_country===false ?
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
        : null
        }

        <Button primary fluid>Next</Button>
      </Form>
    );
  }
}

DemographicForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default DemographicForm;
