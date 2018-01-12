import React from 'react';

class Thanks extends React.Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container" style={{textAlign:'center'}}>
          <h1>Your response has been registered.</h1>
          <h3 className="display-3">Thank you!</h3>
        </div>
      </div>
    );
  }
}

export default Thanks;
