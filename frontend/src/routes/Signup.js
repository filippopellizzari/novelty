import React from 'react';
import {FormGroup, FormControl, ControlLabel, Button, Checkbox, Radio} from 'react-bootstrap';

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

  handleChange (event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit (event){
    event.preventDefault();
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

                <FormGroup>
                  <h6>Gender</h6>
                    <div>
                      <input type="radio" name="gender" value="Male"
                        onChange={this.handleChange.bind(this)} checked/> Male
                    </div>
                    <div>
                      <input type="radio" name="gender" value="Female"
                        onChange={this.handleChange.bind(this)}/> Female
                    </div>
                </FormGroup>

                <Button block href="/welcome"
                  bsSize="large" bsStyle="primary">
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
