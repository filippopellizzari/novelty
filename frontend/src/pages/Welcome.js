import React from 'react';
import survey from '../survey_between.json'

class Welcome extends React.Component {
  render() {
    return (
      <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container" style={{textAlign:'center'}}>
              <h2 className="display-3">Welcome!</h2>
              <p className="lead">Before starting the survey,
                please select {survey.moviesToSelect} movies that you like.</p>
              <a className="btn btn-primary btn-lg" href="/catalogue" role="button">Next</a>
            </div>
          </div>
      </div>

    );
  }
}

export default Welcome;
