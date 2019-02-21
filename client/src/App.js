import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css"

import Navbar from "./components/layout/Navbar";
import Heather from "./components/layout/Heather";

import Tournaments from "./components/tournaments/Tournaments";
import Volunteer from "./components/volunteer/Volunteer";
import Organize from "./components/organize/Organize";
import Participate from "./components/participate/Participate";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Account from "./components/account/Account";
import ViewTournament from "./components/tournaments/ViewTournament";
import EditTournament from "./components/organize/EditTournament";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  toggleMenu(childState) {
    this.setState(() => {
      return ({ visible: childState })
    })
  }

  render() {
    const isVisible = this.state.visible;
    let bodyStyle;

    if (isVisible) {
      bodyStyle = "isVisible"
    } else {
      bodyStyle = "notVisible"
    }

    return (

      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Navbar toggleMenu={this.toggleMenu.bind(this)} />

            <div className={bodyStyle}>
              <Heather />

              <Route exact path="/" component={Tournaments} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/viewtournament/:id" component={ViewTournament} />
              <Switch>
                <PrivateRoute exact path="/organize" component={Organize} />
                <PrivateRoute exact path="/volunteer" component={Volunteer} />
                <PrivateRoute exact path="/participate" component={Participate} />
                <PrivateRoute exact path="/account" component={Account} />
                <PrivateRoute exact path="/edit-tournament/:id" component={EditTournament} />
              </Switch>
            </div>

          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}
export default App;
