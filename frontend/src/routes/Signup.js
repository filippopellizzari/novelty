import React from 'react';
import {FormGroup, FormControl, ControlLabel, Button, Checkbox, Radio} from 'react-bootstrap';
import axios from 'axios';

class Signup extends React.Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      confirmedPassword: '',
      gender: ''
    }
  }

  handleChange (e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleGender(e){
    this.setState({gender: e.target.value});
  }


  handleSubmit (e){
    e.preventDefault();

    axios.post(/users/, {
      email: this.state.email,
      password: this.state.password,
      gender:this.state.gender
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));


  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="email" bsSize="large">
                  <h6>Email</h6>
                  <FormControl
                    autoFocus
                    value={this.state.email}
                    onChange={this.handleChange.bind(this)}
                    type="email"
                  />
                </FormGroup>

                <FormGroup controlId="password" bsSize="large">
                  <h6>Password</h6>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handleChange.bind(this)}
                    type="password"
                  />
                </FormGroup>

                <FormGroup controlId="confirmedPassword" bsSize="large">
                  <h6>Confirm Password</h6>
                  <FormControl
                    value={this.state.confirmedPassword}
                    onChange={this.handleChange.bind(this)}
                    type="password"
                  />
                </FormGroup>

                <FormGroup controlId="gender">
                  <h6>Gender</h6>
                  <select value={this.state.value}
                    onChange={this.handleGender.bind(this)}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </FormGroup>

                <Button block href="/welcome"
                  bsSize="large" bsStyle="primary"
                  onClick={this.handleSubmit.bind(this)}>
                  Signup
                </Button>

              </form>
              <div className="card-footer text-muted text-center">
                Already have an account? <a href="/login">Log in</a>
              </div>

            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Signup;
