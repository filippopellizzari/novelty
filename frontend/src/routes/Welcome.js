import React from 'react';

class Welcome extends React.Component {
  render() {
    return (
      <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container" style={{textAlign:'center'}}>
              <h2 className="display-3">Welcome!</h2>
              <p className="lead">Before starting the survey, please select N movies that you like.</p>
              <a className="btn btn-primary btn-lg" href="/catalogue" role="button">Next</a>
            </div>
          </div>
      </div>

    );
  }
}

export default Welcome;
