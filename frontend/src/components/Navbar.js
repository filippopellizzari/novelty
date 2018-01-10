import React from 'react';

class Navbar extends React.Component {

  render() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">Novelty Survey</a>
          </div>
        </nav>
    );
  }
}

export default Navbar;
