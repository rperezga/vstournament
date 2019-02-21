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

import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/tournamentAPI";
import gameApi from "../../utils/gameAPI";
import OrganizeTab from "./OrganizeTab"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Organize extends Component {

  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      name: '',
      organizer: '',
      venue: '',
      address: '',
      tournaments: [],
      games: [],
      game: '',
      channel: '',
      tab: 'new',
      tabNew: 'nav-link active',
      tabLive: 'nav-link',
      tabCompleted: 'nav-link',
      //status: '',
      //brackets: [],
      //players: [{user: '', status: ''}],
      //judges: [{user: '', status: ''}],
      //notifications: [],
      //result: [{user: '', position: ''}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    API.getUser(this.props.auth.user.id).then(res => {
      this.setState({ organizer: res.data.user._id });
      this.loadMyTournaments();
      this.loadAllGames();
    });
  }

  handleTabClick(event) {
    const id = event.target.id;
    this.setState({
      tab: id
    })
    if (id === 'new') {
      this.setState({
        tabNew: 'nav-link active',
        tabLive: 'nav-link',
        tabCompleted: 'nav-link'
      })
    } else if (id === 'live') {
      this.setState({
        tabNew: 'nav-link',
        tabLive: 'nav-link active',
        tabCompleted: 'nav-link'
      })
    } else if (id === 'completed') {
      this.setState({
        tabNew: 'nav-link',
        tabLive: 'nav-link',
        tabCompleted: 'nav-link active'
      })
    }
  }

  loadAllGames() {
    gameApi.getGames()
      .then(res => {
        this.setState({ games: res.data });
      })
      .catch(err => console.log(err));
  }

  loadAllTournaments = () => {
    API.getTournaments()
      .then(res => {
        console.log(res);
        this.setState({ tournaments: res.data });
      })
      .catch(err => console.log(err));
  };

  loadMyTournaments = () => {
    API.getUserTournaments(this.state.organizer)
      .then(res => {this.setState({ tournaments: res.data })})
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    const tournamentData = {
      name: this.state.name,
      date: this.state.date,
      organizer: this.state.organizer,
      game: this.state.game,
      venue: this.state.venue,
      address: this.state.address,
      channel: this.state.channel
    };

    API.saveTournament(tournamentData)
      .then(res => this.loadMyTournaments())
      .catch(err => console.log(err));
  }

  handleChange(selectedDate) {
    this.setState({
      date: selectedDate
    });
  }

  render() {
    return (
      <div style={{ margin: '20px' }}>

        <div style={{ margin: '30px' }}>
          <div className="row">
            <div className="col">
              <h4>ORGANIZE</h4>
            </div>
            <div className="col">
              <div style={{ textAlign: "right" }}>
                {this.props.auth.user.id ? (
                  <MDBBtn onClick={this.toggle}>Create Tournament</MDBBtn>
                ) : ("")}
              </div>
            </div>
          </div>

          <div style={{ margin: "0 50px" }}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className={this.state.tabNew} id="new" onClick={this.handleTabClick}>New Tournaments</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabLive} id="live" onClick={this.handleTabClick}>Live Tournaments</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabCompleted} id="completed" onClick={this.handleTabClick}>Completed Tournaments</a>
              </li>
            </ul>

            <div style={{ margin: "20px 50px" }}>
              <h1>
                {this.state.tournaments.map((tournament) => {
                  if (this.state.tab === 'new' && (tournament.status === 'new' || tournament.status === 'open' || tournament.status === 'closed' || tournament.status === 'ready')) {
                    return (
                      <OrganizeTab
                        name={tournament.name}
                        date={tournament.date}
                        game={tournament.game.name}
                        tournamentId={tournament._id}
                      />
                    )
                  }
                  else if(this.state.tab === 'live' && tournament.status === 'running'){
                    return (
                      <OrganizeTab
                        name={tournament.name}
                        date={tournament.date}
                        game={tournament.game.name}
                        tournamentId={tournament._id}
                      />
                    )
                  }
                  else if(this.state.tab === 'completed' && tournament.status === 'finished'){
                    return (
                      <OrganizeTab
                        name={tournament.name}
                        date={tournament.date}
                        game={tournament.game.name}
                        tournamentId={tournament._id}
                      />
                    )
                  }
                })
                }
              </h1>
            </div>
          </div>
        </div>

        <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
            <form noValidate onSubmit={this.onSubmit}>
              <MDBModalHeader toggle={this.toggle}>Create new Tournament</MDBModalHeader>
              <MDBModalBody>
                <div className="grey-text">
                  <MDBInput
                    label="Name"
                    onChange={this.onChange}
                    value={this.state.name}
                    id="name"
                    type="text"
                    group
                  />
                  <MDBInput
                    label="Venue"
                    onChange={this.onChange}
                    value={this.state.venue}
                    id="venue"
                    type="text"
                    group
                  />
                  <MDBInput
                    label="Address"
                    onChange={this.onChange}
                    value={this.state.address}
                    id="address"
                    type="text"
                    group
                  />
                  <MDBInput
                    label="Channel"
                    onChange={this.onChange}
                    value={this.state.channel}
                    id="channel"
                    type="text"
                    group
                  />

                  <MDBRow>
                    <MDBCol size="7">
                      <div>
                        <select className="browser-default custom-select" id="game" onChange={this.onChange}>
                          <option>Choose game for tournament</option>
                          {this.state.games.length ? (
                            this.state.games.map(game => (
                              <option value={game._id}>{game.name}</option>
                            ))

                          ) : ("")}
                        </select>
                      </div>
                    </MDBCol>
                    <MDBCol size="5">
                      <DatePicker className="browser-default custom-select"
                        selected={this.state.date}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showDisabledMonthNavigation
                        placeholderText="Date and time"
                      />
                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                <MDBBtn color="primary" type="submit">Save changes</MDBBtn>
              </MDBModalFooter>

            </form>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Organize);
