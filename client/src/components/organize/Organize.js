import { subscribeToTimer } from '../../socket';

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Organize extends Component {

  state = {
    value: 'no activity yet'
  };


  constructor(props) {
    super(props);
    subscribeToTimer((value) => this.setState({
      value
    }));
  }

  render() {
    return (
      <div className="container">
        <h1>ORGANIZE</h1>
        <Link to="/createEvent">Tournaments</Link>

        <p className="App-intro">
          This is the value: {this.state.value}
        </p>
      </div>
    );
  }
}

export default Organize;
