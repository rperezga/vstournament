import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import API from "../../utils/tournamentAPI";
import APIUser from "../../utils/userAPI";

import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      modal: false,
      userName: '',
      playerName: '',
      name: '',
      team: '',
      region: ''
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
    API.getUser(this.props.auth.user.id).then(res => {
      this.setState({ user: res.data.user });
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onEditClick = e => {
    this.setState({
      modal: !this.state.modal
    });

    this.state.userName = this.state.user.userName
    this.state.playerName = this.state.user.playerName
    this.state.name = this.state.user.name
    this.state.team = this.state.user.team
    this.state.region = this.state.user.region
  };

  onCancelClick = e => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmitClick = e => {
    this.setState({
      modal: !this.state.modal
    });

    const userData = {
      userName: this.state.userName,
      playerName: this.state.playerName,
      name: this.state.name,
      team: this.state.team,
      region: this.state.region
    };

    APIUser.updateUser(this.props.auth.user.id, userData).then((res) => {
      if (res) {
        API.getUser(this.props.auth.user.id).then(res => {
          this.setState({ user: res.data.user });
        });
      }
    })
  };


  render() {

    return (
      <MDBContainer className="mt-5 text-center">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron>
              <h2 className="h1 display-3">Hello, {this.state.user.name}!</h2>
              <h3>
                Thank you for being part of VS Torunaments!
              </h3>

              <hr className="my-2" />

              <MDBRow style={{ marginTop: '30px' }}>
                <MDBCol md="6">
                  <p><h4><strong>Username:</strong> {this.state.user.userName}</h4></p>
                  <p><h4><strong>Name:</strong> {this.state.user.name}</h4></p>
                  <p><h4><strong>Team:</strong> {this.state.user.team}</h4></p>
                </MDBCol>
                <MDBCol md="6">
                  <p><h4><strong>Playername:</strong> {this.state.user.playerName}</h4></p>
                  <p><h4><strong>Email:</strong> {this.state.user.email}</h4></p>
                  <p><h4><strong>Region:</strong> {this.state.user.region}</h4></p>
                </MDBCol>
              </MDBRow>

              <hr className="my-2" />

              <button
                style={{
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "2rem"
                }}
                onClick={this.onEditClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Edit
              </button>

              <button
                style={{
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "2rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable red accent-3"
              >
                Logout
              </button>

            </MDBJumbotron>
          </MDBCol>
        </MDBRow>

        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <form>

            <MDBModalHeader toggle={this.toggle}>Edit Account</MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="User Name"
                onChange={this.onChange}
                value={this.state.userName}
                id="userName"
                name="userName"
                type="text"
                group
              />
              <MDBInput
                label="Player Name"
                onChange={this.onChange}
                value={this.state.playerName}
                id="playerName"
                name="playerName"
                type="text"
                group
              />
              <MDBInput
                label="Name"
                onChange={this.onChange}
                value={this.state.name}
                id="name"
                name="name"
                type="text"
                group
              />
              <MDBInput
                label="Team"
                onChange={this.onChange}
                value={this.state.team}
                id="team"
                name="team"
                type="text"
                group
              />
              <MDBInput
                label="Region"
                onChange={this.onChange}
                value={this.state.region}
                id="region"
                name="region"
                type="text"
                group
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.onCancelClick}>Close</MDBBtn>
              <MDBBtn color="primary" onClick={this.onSubmitClick}>Save changes</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModal>

      </MDBContainer>
    );
  }
}

Account.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Account);
