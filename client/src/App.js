import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";

import Players from "./components/players/Players";
import Organize from "./components/organize/Organize";
import Participate from "./components/participate/Participate";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Account from "./components/account/Account";


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
  render() {
    return (

      <Provider store={store}>

        <Router>
          <React.Fragment>
            <Navbar />
            
            <Route exact path="/players" component={Players} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/organize" component={Organize} />
            <Switch>
              <PrivateRoute exact path="/participate" component={Participate} />
              <PrivateRoute exact path="/account" component={Account} />
            </Switch>

          </React.Fragment>
        </Router>

      </Provider>
    );
  }
}
export default App;
