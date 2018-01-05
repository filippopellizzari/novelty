import React from 'react';

class Base extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/home">Novelty Survey</a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Base;
