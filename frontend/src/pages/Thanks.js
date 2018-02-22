import React from 'react';
import admin from '../data/admin.json'

class Thanks extends React.Component {
  render() {

    var survey_code = admin.crowdflower
    ? <div className="card">
        <div className="card-body">
          <h3>Your Survey Code is</h3>
          <h2>{admin.survey_code}</h2>
          <h3>(Copy and submit)</h3>
        </div>
      </div>
    : null

    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container" style={{textAlign:'center'}}>
            <h1>Your response has been registered.</h1>
            <h3 className="display-3">Thank you!</h3>
          </div>
        </div>
        <div className="container" style={{textAlign:'center'}}>
          {survey_code}
        </div>
      </div>
    );
  }
}

export default Thanks;
