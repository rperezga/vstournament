import React, { Component } from "react";
import { Link } from "react-router-dom";

class Heather extends Component {
  
  render() {
    return (
        <nav>
        <div style={{textAlign: "center"}} >
          <Link to="/" style={{ fontFamily: "monospace" }}>
            <img src="./logo.png" id="logo" alt="VS Tournament" />
          </Link>
        </div>
        <hr />
      </nav>
    );
  }
}

export default Heather;
