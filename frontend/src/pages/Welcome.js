import React from 'react';
import survey from '../survey_between.json';
import { Button} from 'semantic-ui-react';

class Welcome extends React.Component {
  render() {
    return (
      <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container" style={{textAlign:'center'}}>
              <h2 className="display-3">Welcome!</h2>
              <p className="lead">Before starting the survey,
                please select {survey.moviesToSelect} movies that you like.</p>
              <Button primary size="large" href="/catalogue">Next</Button>
            </div>
          </div>
      </div>

    );
  }
}

export default Welcome;
