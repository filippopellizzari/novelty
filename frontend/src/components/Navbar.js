import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown, Icon } from "semantic-ui-react";


import { logout } from '../actions/authActions';


const Navbar = ({isAuthenticated, logout}) => (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <div className="navbar-header">
              <div className="navbar-brand">Movie Survey</div>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto" >
                {isAuthenticated && (
                  <Dropdown style={{color:"white"}} trigger={<Icon name='user' style={{color:"white"}}/>}>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </ul>
            </div>
          </div>
        </nav>
)

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: localStorage.jwtRefresh !== undefined || localStorage.accessToken !== undefined
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
