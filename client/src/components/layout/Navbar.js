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
      <React.Fragment>

        <nav>
          <div style={{textAlign: "center"}} >
            <Link to="/" style={{ fontFamily: "monospace" }}>
              <img src="./logo.png" id="logo" alt="VS Tournament" />
            </Link>
          </div>
          <hr />
        </nav>

        <SideNav
          onSelect={(selected) => {

          }}

          id="sidebar"
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">

            <NavItem eventKey="home">
              <NavIcon>
                <Link to="/"><i className="fab fa-angellist" style={{ fontSize: '1.75em' }} /></Link>
              </NavIcon>
              <NavText>
                <Link to="/">Tournaments</Link>
              </NavText>
            </NavItem>

            <NavItem eventKey="players">
              <NavIcon>
                <Link to="/players"><i className="fas fa-users" style={{ fontSize: '1.75em' }} /></Link>
              </NavIcon>
              <NavText>
                <Link to="/players">Players</Link>
              </NavText>
            </NavItem>

            <NavItem eventKey="organize">
              <NavIcon>
                <Link to="/organize"><i className="fas fa-sitemap" style={{ fontSize: '1.75em' }} /></Link>
              </NavIcon>
              <NavText>
                <Link to="/organize">Organize</Link>
              </NavText>
            </NavItem>

            <NavItem eventKey="participate">
              <NavIcon>
                <Link to="/participate"><i className="fas fa-bullhorn" style={{ fontSize: '1.75em' }} /></Link>
              </NavIcon>
              <NavText>
                <Link to="/participate">Paticipate</Link>
              </NavText>
            </NavItem>

            <NavItem eventKey="account">
              <NavIcon>
                <Link to="/account"><i className="far fa-user" style={{ fontSize: '1.75em' }} /></Link>
              </NavIcon>
              <NavText>
                <Link to="/account">Account</Link>
              </NavText>
            </NavItem>

          </SideNav.Nav>
        </SideNav>

      </React.Fragment>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Navbar);
