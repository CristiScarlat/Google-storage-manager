import React from 'react';
import { Navbar } from 'react-bootstrap';
import Logout from '../../pages/auth/logout'
import { connect } from 'react-redux';
import './header.css';

function Header(props) {

    return(
        <Navbar className="d-flex justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          Google Storage Manager
        </Navbar.Brand>
        <div className="d-flex justify-content-center align-items-center">
            {props.user && <div className="login-info pr-2">{`Loged in as: ${props.user}`}</div>}
            <Logout/>
        </div>
      </Navbar>
    )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, null)(Header);