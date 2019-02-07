import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBCol
} from 'mdbreact';

import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/tournamentAPI";
import gameApi from "../../utils/gameAPI";
import MyTournaments from "./MyTournaments"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

class Organize extends Component {

  state = {
    modal: false,
    date: '',
    name: '',
    organizer: '',
    venue: '',
    address: '',
    tournaments: [],
    games: []
    //status: '',
    //brackets: [],
    //players: [{user: '', status: ''}],
    //judges: [{user: '', status: ''}],
    //notifications: [],
    //result: [{user: '', position: ''}]

  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  constructor(props) {
    super(props);
    this.setState({ organizer: this.props.auth.user.id });
    this.state = {
      date: '',
      name: '',
      tournaments: [],
      games: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    API.getUser(this.props.auth.user.id).then(res => {
      this.setState({ organizer: res.data.user._id });
      this.loadAllTournaments();
      this.loadAllGames();
    });
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
        this.setState({ tournaments: res.data });
      }
      )
      .catch(err => console.log(err));
  };

  loadTournaments = () => {
    API.getUserTournaments(this.state.organizer)
      .then(res => {
        this.setState({ tournaments: res.data });
      }
      )
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    const tournamentData = {
      name: this.state.name,
      date: this.state.date,
      //status: this.state.status,
      organizer: this.state.organizer
    };

    API.saveTournament(tournamentData)
      .then(res => this.loadTournaments())
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
                <a className="nav-link active" href="#">Pending Tournaments</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Closed Tournaments</a>
              </li>
            </ul>

            <ul style={{ marginTop: "15px" }}>
              <MyTournaments thumbnail="" />
              <MyTournaments thumbnail="" />
            </ul>

          </div>





        </div>







        <MDBContainer>
          {this.state.tournaments.length ? (
            <MDBListGroup>
              {this.state.tournaments.map(tournament => (
                <MDBListGroupItem key={tournament._id}>
                  <Link to={"/tournaments/" + tournament._id}>
                    <strong>
                      {tournament.name} is {tournament.status} happening on --
                      <Moment format=" YYYY/MM/DD HH:mm">
                        {tournament.date}
                      </Moment>
                    </strong>
                  </Link>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          ) : (
              <h3>No Results to Display</h3>
            )}

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

                  <MDBRow>
                    <MDBCol size="7">
                      <div>
                        <select className="browser-default custom-select">
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
                        placeholderText="Click to select a date and time"
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