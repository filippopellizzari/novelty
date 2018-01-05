import React from 'react';
import {FormGroup, FormControl, ControlLabel, Button, Checkbox, Radio} from 'react-bootstrap';

class Login extends React.Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
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
    <div>
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

                <Button block href="/welcome"
                  bsSize="large" bsStyle="primary">
                  Login
                </Button>

              </form>
              <div className="card-footer text-muted text-center">
                New to Novelty Survey? <a href="/signup">Sign up</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    );
  }
}

export default Login;
