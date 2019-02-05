import { subscribeToTimer } from '../../socket';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBListGroup, 
  MDBListGroupItem
} from 'mdbreact';

import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../utils/tournamentAPI";

class Organize extends Component {

  state = {
    value: 'no activity yet',
    modal: false,
    date: '',
    name: '',
    //status: '',
    organizer: '',
    tournaments: [],
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
    subscribeToTimer((value) => this.setState({
      value
    }));
    this.setState({organizer: this.props.auth.user.id});
    this.state = {
      date: '',
      name: '',
      tournaments: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({organizer: this.props.auth.user.id});
    this.loadTournaments();
  }

  loadTournaments = () => {
    API.getTournaments()
      .then(res =>
        this.setState({ tournaments: res.data, name: "", date: ""})
      )
      .catch(err => console.log(err));
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

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
    
    //console.log(this.state)

    return (
      <div className="container">
        <h1>ORGANIZE</h1>
        {/* <Link to="/createEvent">Tournaments</Link> */}

        <p>{this.state.organizer}</p>

        <MDBContainer>
        {this.state.tournaments.length ? (
              <MDBListGroup>
                {this.state.tournaments.map(tournament => (
                  <MDBListGroupItem key={tournament._id}>
                    <Link to={"/tournaments/" + tournament._id}>
                      <strong>
                        {tournament.name} is {tournament.status} happening on {tournament.date}
                      </strong>
                    </Link>
                  </MDBListGroupItem>
                ))}
              </MDBListGroup>
            ) : (
              <h3>No Results to Display</h3>
            )}
          <MDBBtn onClick={this.toggle}>Create Tournament</MDBBtn>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
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

                  {/* <MDBInput
                    label="Game"
                    onChange={this.onChange}
                    value={this.state.game}
                    id="game"
                    type="text"
                    group
                  /> */}
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showDisabledMonthNavigation
                    placeholderText="Click to select a date and time"
                  />
                </div>

              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                <MDBBtn color="primary"  type="submit">Save changes</MDBBtn>
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
