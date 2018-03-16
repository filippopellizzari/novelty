import React from 'react';
import { Button} from 'semantic-ui-react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import admin from '../data/admin.json';
import { getProfile }   from "../actions/stateActions";

class Welcome extends React.Component {

  componentDidMount() {
    this.props.getProfile(localStorage.email)
        .then( (res) => this.props.history.push("/"+res.data.page));
  }


  render() {
    return (
      <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container" style={{textAlign:'center'}}>
              <h2 className="display-3">Welcome!</h2>
              <p className="lead">Before starting the survey,
                please select {admin.moviesToSelect} movies that you like.</p>
              <Button primary size="large" href="/catalogue">Next</Button>
            </div>
          </div>
      </div>

    );
  }
}

Welcome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getProfile: PropTypes.func.isRequired,
};

export default connect(null, { getProfile})(Welcome);
