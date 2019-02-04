import { subscribeToTimer } from '../../socket';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from 'mdbreact';

import { connect } from "react-redux";

import axios from "axios";

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Organize extends Component {

  state = {
    value: 'no activity yet',
    modal: false,
    name: '',
    game: '',
    userId: ''
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
    this.setState({userId: this.props.auth.user.id});
  }

  componentDidMount() {
    this.setState({userId: this.props.auth.user.id});
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const tournamentData = {
      name: this.state.name,
      game: this.state.game,

    };

    // axios
    //   .post("/api/tournaments/create", tournamentData)
    //   .then(res => console.log('Tournament created!'))
    //   .catch(err =>
    //     console.log(err)
    //   );
  };



  render() {  
    
    console.log(this.state)

    return (
      <div className="container">
        <h1>ORGANIZE</h1>
        <Link to="/createEvent">Tournaments</Link>

        <p className="App-intro">
          This is the value: {this.state.value}
        </p>

        <p>{this.state.userId}</p>





        <MDBContainer>
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

                  <MDBInput
                    label="Game"
                    onChange={this.onChange}
                    value={this.state.game}
                    id="game"
                    type="text"
                    group
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
