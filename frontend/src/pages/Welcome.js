import React from 'react';
import { Button} from 'semantic-ui-react';

import admin from '../data/admin.json';

class Welcome extends React.Component {
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

export default Welcome;
