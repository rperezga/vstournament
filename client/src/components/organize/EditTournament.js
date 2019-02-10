import React, { Component } from "react";
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
    MDBRow,
    MDBCol
    } from 'mdbreact';

  class EditTournament extends Component {

    constructor(props) {

        super(props);
        this.state = {
          tab: 'info',
          tabInfo: 'nav-link active',
          tabPlayers: 'nav-link',
          tabVolunteers: 'nav-link',
        };

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(event) {
        const id = event.target.id;
        this.setState({
          tab: id
        })
        if (id === 'info') {
          this.setState({
            tabInfo: 'nav-link active',
            tabPlayers: 'nav-link',
            tabVolunteers: 'nav-link',
          })
        } else if (id === 'players') {
          this.setState({
            tabInfo: 'nav-link',
            tabPlayers: 'nav-link active',
            tabVolunteers: 'nav-link',
          })
        } else if (id === 'volunteers') {
          this.setState({
            tabInfo: 'nav-link',
            tabPlayers: 'nav-link',
            tabVolunteers: 'nav-link active',
          })
        }
      }
    render () {
        return (
            <div style={{ margin: '20px' }}>

                <div>{this.props.match.params.id}</div>
                <div style={{ margin: '30px' }}>
                    <div className="row">
                        <div className="col">
                        <h4>ORGANIZE</h4>
                        </div>
                    </div>

                    <div style={{ margin: "0 50px" }}>
                        <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={this.state.tabInfo} id="info" onClick={this.handleTabClick}>Tournament Info</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.state.tabPlayers} id="players" onClick={this.handleTabClick}>Players</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.state.tabVolunteers} id="volunteers" onClick={this.handleTabClick}>Volunteers</a>
                        </li>
                        </ul>

                        {/* Tab content */}
                    </div>
                </div>
            </div>
        );
    }
  }

  export default EditTournament;