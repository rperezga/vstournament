import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import './Navbar.css'

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }

    this.toggleNavMenu = this.toggleNavMenu.bind(this);
  }

  toggleNavMenu() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    const { user } = this.props.auth;
    return (
      <React.Fragment>
        <SideNav visible={this.props.visible} style={{ heigth: "100%", position: "fixed" }}>

          <SideNav.Toggle onClick={() => {
            this.props.toggleMenu(this.state.visible);
            this.toggleNavMenu()
          }
          } />

          {user.name ?
            <SideNav.Nav defaultSelected="home">

              <NavItem eventKey="home">
                <NavIcon>
                  <Link to="/"><i className="fab fa-angellist" style={{ fontSize: '1.4em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link to="/">Tournaments</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="organize">
                <NavIcon>
                  <Link to="/organize"><i className="fas fa-sitemap" style={{ fontSize: '1.4em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link to="/organize">Organize</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="volunteer">
                <NavIcon>
                  <Link to="/volunteer"><i className="fas fa-users" style={{ fontSize: '1.4em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link to="/volunteer">Volunteer</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="participate">
                <NavIcon>
                  <Link to="/participate"><i className="fas fa-bullhorn" style={{ fontSize: '1.4em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link to="/participate">Paticipate</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="account">
                <NavIcon>
                  <Link to="/account"><i className="far fa-user" style={{ fontSize: '1.4em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link to="/account">Account</Link>
                </NavText>
              </NavItem>
            </SideNav.Nav>

            :
            <SideNav.Nav defaultSelected="home">

              <NavItem eventKey="home">
                <NavIcon>
                  <Link to="/"><i className="fab fa-angellist" style={{ fontSize: '1.4em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link to="/">Tournaments</Link>
                </NavText>
              </NavItem>

              <NavItem eventKey="account">
                <NavIcon>
                  <Link to="/account"><i className="far fa-user" style={{ fontSize: '1.4em' }} /></Link>
                </NavIcon>
                <NavText>
                  <Link to="/account">Account</Link>
                </NavText>
              </NavItem>

            </SideNav.Nav>
          }
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
