import React from 'react';
import { Navbar } from 'react-bootstrap';
import Logout from '../../pages/auth/logout'
import './header.css';

function Header() {

    const user = localStorage.getItem('user');

    return(
        <Navbar className="d-flex justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          Google Storage Manager
        </Navbar.Brand>
        <div className="d-flex justify-content-center align-items-center">
            <div className="login-info pr-2">{`Loged in as: ${user}`}</div>
            <Logout/>
        </div>
        
      </Navbar>
    )
}

export default Header;