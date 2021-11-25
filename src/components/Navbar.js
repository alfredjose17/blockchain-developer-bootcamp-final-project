import React, { Component } from 'react'
import logo from '../token-logo.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar nav-fill w-100 navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a href='https://ropsten.etherscan.io/address/0xe0b76e8069f082f446Bc626d5E9Ec4C4c71fC043' 
           className="navbar-brand col-sm-3 col-md-2 mr-0" target="_blank" rel="noopener noreferrer">
          <img src={logo} width="35" height="35" className="d-inline-block align-top" alt="" />
          &nbsp; Ace Token Farm
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-light">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
