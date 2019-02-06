import React, { Component } from "react";
import { Link } from "react-router-dom";

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import './Navbar.css'

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }



  // VER DONDE VOY A MOSTRAR ESTO
  toggleNav() {
    if (this.state.open == true) {
      this.setState({
        open: false
      });
    } else {
      this.setState({
        open: true
      });
    }
    console.log(this.state.open)
  }
  // VER DONDE VOY A MOSTRAR ESTO





  render() {
    return (
      <React.Fragment>
        <SideNav>
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

export default Navbar;
