import React, { Component } from "react";
import {
    MDBContainer,
    MDBBtn,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBAlert
  } from 'mdbreact';
import API from '../../utils/tournamentAPI'

  class EditTournament extends Component {

    constructor(props) {

        super(props);
        this.state = {
          name: '',
          game: '',
          address: '',
          venue: '',
          status: '',
          tab: 'info',
          tabInfo: 'nav-link active',
          tabPlayers: 'nav-link',
          tabVolunteers: 'nav-link',
          infoMessage: '',
          statusButton: '',
          disable: true,
          editButton: 'Edit'
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.editTournamentInfo = this.editTournamentInfo.bind(this);
    }

    componentDidMount() {
      API.getTournament(this.props.match.params.id)
        .then(res => {
          this.setState({
            name: res.data.name,
            game: res.data.game,
            address: res.data.address,
            venue: res.data.venue,
            status: res.data.status
          });
          this.setInfoMessage();
        }).catch(err => console.log(err));
    }

    setInfoMessage() {

      if (this.state.status === 'new') {
        this.setState({
          infoMessage: 'Tournament has been created. Press open to make tournament open for public',
          statusButton:'Open'
        })
      }

      else if (this.state.status === 'open') {
        this.setState ({
          infoMessage: 'Tournament is open for registration and wating for approval of volunteers and players. Press close to close registration',
          statusButton: 'Close'
        })
      }

      else if (this.state.status === 'closed') {
        this.setState({
          infoMessage:'Tournament is closed for registration. Press start to make tournament live',
          statusButton: 'Start'
        })
      }

      else if (this.state.status === 'running') {
        this.setState({
          infoMessage: 'Tournament is live. Press end once is done',
          statusButton: 'End'
        })
      }

      else if (this.state.status === 'finished') {
        this.setState({
          infoMessage: 'Tournament has been completed. No other action require from your part',
          statusButton: ''
        })
      }
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

    changeStatus () {

      let status = '';

      if (this.state.statusButton === 'Open')
        {status = 'open';}
      else if (this.state.statusButton === 'Close')
        {status = 'closed';}
      else if (this.state.statusButton === 'Start')
        {status = 'running';}
      else if (this.state.statusButton === 'End')
        {status = 'finsihed';}

      API.updateStatus(this.props.match.params.id, {status: status})
        .then (res => {
          this.setState({status: res.data.status, tab: 'info', tabInfo: 'nav-link active'});
          this.setInfoMessage();
        })
        .catch(err => console.log(err));
    }

    editTournamentInfo () {
      
      if (this.state.disable) {
        this.setState ({disable: false, editButton: 'Update'})
      }

      else {
        this.setState({disable: true, editButton: 'Edit'})
      }
    }

    render () {
        return (
          <MDBContainer>
            <div style={{ margin: '20px' }}>
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

                        <div style={{ margin: "20px 50px" }}>
                        
                          <MDBAlert color="info" >
                            <MDBRow className="row">
                              <MDBCol className="col-10" style={{paddingTop: '10px'}}>
                                {this.state.infoMessage}
                              </MDBCol>
                              <MDBCol className="col-2">
                                <button className="btn btn-primary" onClick={this.changeStatus}>{this.state.statusButton}</button>
                              </MDBCol>
                            </MDBRow>
                          </MDBAlert>
                          <MDBRow>
                            <MDBCol md="6">
                            <label htmlFor="defaultFormContactNameEx" className="grey-text">
                              Name
                            </label>
                            <input
                              type="text"
                              id="defaultFormContactNameEx"
                              className="form-control"
                              value={this.state.name}
                              disabled={this.state.disable}
                            />
                            </MDBCol>
                            <MDBCol md="6">
                            <label htmlFor="defaultFormContactNameEx" className="grey-text">
                              Game
                            </label>
                            <input
                              type="text"
                              id="defaultFormContactNameEx"
                              className="form-control"
                              value={this.state.game}
                              disabled={this.state.disable}
                            />
                            </MDBCol>
                          </MDBRow>
                          <br />
                          <MDBRow>
                            <MDBCol md="6">
                            <label htmlFor="defaultFormContactNameEx" className="grey-text">
                              Venue
                            </label>
                            <input
                              type="text"
                              id="defaultFormContactNameEx"
                              className="form-control"
                              value={this.state.venue}
                              disabled={this.state.disable}
                            />
                            </MDBCol>
                            <MDBCol md="6">
                            <label htmlFor="defaultFormContactNameEx" className="grey-text">
                              Address
                            </label>
                            <input
                              type="text"
                              id="defaultFormContactNameEx"
                              className="form-control"
                              value={this.state.address}
                              disabled={this.state.disable}
                            />
                            </MDBCol>
                          </MDBRow>
                          <br />
                          <MDBRow>
                          <MDBCol md="3">
                            <button className="btn btn-primary" onClick={this.editTournamentInfo}>{this.state.editButton}</button>
                            </MDBCol>
                          </MDBRow>
                        </div>
                    </div>
                </div>
            </div>
          </MDBContainer>
        );
    }
  }

  export default EditTournament;