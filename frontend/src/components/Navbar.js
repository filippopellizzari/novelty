import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

  render() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Novelty Survey</Link>
            </div>
          </div>
        </nav>
    );
  }
}

export default Navbar;
