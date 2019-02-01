import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './Navbar.css'

class Navbar extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <nav>
          <div className="nav-wrapper blue">
          <Link to="/" style={{ fontFamily: "monospace" }}>
              <img src="./logo.png" id="logo" alt="VS Tournament" />
            </Link>

            {user.name ?
              <ul className="right hide-on-med-and-down">
                <li><Link to="/dashboard"><i className="material-icons left">dashboard</i>Dashboard</Link></li>
                <li><Link to="/organizer"><i className="material-icons left">dvr</i>Organizer</Link></li>
                <li><Link to="/player"><i className="material-icons left">directions_run</i>Player</Link></li>
                <li><Link to="/account"><i className="material-icons left">settings</i>Account</Link></li>
              </ul>
              :
              <ul className="right hide-on-med-and-down">
              <li><Link to="/tournaments"><i className="material-icons left">dashboard</i>Tournaments</Link></li>
                <li><Link to="/login"><i className="material-icons left">person</i>Login</Link></li>
                <li><Link to="/register"><i className="material-icons left">person_add</i>Register</Link></li>
              </ul>
            }
          </div>

          



        </nav>




    );
  }
}



            

           


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Navbar);
