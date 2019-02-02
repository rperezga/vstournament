import React, { Component } from "react";
import { Link } from "react-router-dom";

class Organize extends Component {
  render() {
    return (
      <div className="container">
          <h1>ORGANIZE</h1>
          <Link to="/createEvent">Tournaments</Link>
      </div>
    );
  }
}

export default Organize;
