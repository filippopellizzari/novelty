import React from 'react';
import { Button} from 'semantic-ui-react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import axios from 'axios';

import admin from '../data/admin.json';
import { getProfile }   from "../actions/stateActions";


class Welcome extends React.Component {

  componentDidMount() {
    document.title = "Welcome"
    localStorage.removeItem('thanks');
    this.props.getProfile(localStorage.email)
        .then( (res) => this.props.history.push("/"+res.data.page));
    axios.get("/api/surveys/")
      .then ( (res) => this.selectRandomSurvey(res.data))
  }

  selectRandomSurvey(surveys){
    var ids = surveys.map(
      (survey) => survey.survey_id
    )
    var res = ids[Math.floor(Math.random() * ids.length)];
    localStorage.setItem("survey_id",res)
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
