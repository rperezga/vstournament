import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import './Navbar.css'

class Navbar extends Component {
  render() {
    const { user } = this.props.auth;
    return (

      <SideNav
        onSelect={(selected) => {
          
        }}

        id="sidebar"
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">

          <NavItem eventKey="home">
            <NavIcon>
              <i className="fab fa-angellist" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              <Link to="/">Tournaments</Link>
            </NavText>
          </NavItem>

          <NavItem eventKey="players">
            <NavIcon>
              <i className="fas fa-users" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              <Link to="/players">Players</Link>
            </NavText>
          </NavItem>

          <NavItem eventKey="organize">
            <NavIcon>
              <i className="fas fa-sitemap" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              <Link to="/organize">Organize</Link>
            </NavText>
          </NavItem>

          <NavItem eventKey="participate">
            <NavIcon>
              <i className="fas fa-bullhorn" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              <Link to="/participate">Paticipate</Link>
            </NavText>
          </NavItem>

          <NavItem eventKey="account">
            <NavIcon>
              <i className="far fa-user" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              <Link to="/account">Account</Link>
            </NavText>
          </NavItem>

          <NavItem eventKey="login">
            <NavIcon>
              <i className="fas fa-sign-in-alt" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              <Link to="/login">Login</Link>
            </NavText>
          </NavItem>

          <NavItem eventKey="register">
            <NavIcon>
              <i className="fas fa-check-double" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              <Link to="/register">Register</Link>
            </NavText>
          </NavItem>

        </SideNav.Nav>
      </SideNav>



    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Navbar);
