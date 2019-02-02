import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBBtn
} from 'mdbreact'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      playerName: "",
      team: "",
      region: "",
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/events");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      userName: this.state.userName,
      playerName: this.state.playerName,
      team: this.state.team,
      region: this.state.region,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment >

        <MDBRow>
          <MDBCol md="8" className="offset-md-2">
            <MDBCol>
              <MDBCard style={{ width: "60rem" }}>
                <MDBCardBody>
                  <MDBCardTitle>Register</MDBCardTitle>
                  <hr />
                  <MDBCardText>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="grey-text">
                        <MDBRow>
                          <MDBCol size="6">
                            <MDBInput
                              label="User Name"
                              onChange={this.onChange}
                              value={this.state.userName}
                              id="userName"
                              type="text"
                              className={classnames("", {
                                invalid: errors.userName || errors.usernamenotfound
                              })}
                              group
                            />
                          </MDBCol>
                          <MDBCol size="6">
                            <MDBInput
                              label="Player Name"
                              onChange={this.onChange}
                              value={this.state.playerName}
                              id="playerName"
                              type="text"
                              className={classnames("", {
                                invalid: errors.playerName || errors.playernotfound
                              })}
                              group
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <MDBCol size="6">
                            <MDBInput
                              label="Team"
                              onChange={this.onChange}
                              value={this.state.team}
                              id="team"
                              type="text"
                              className={classnames("", {
                                invalid: errors.team || errors.teamnotfound
                              })}
                              group
                            />
                          </MDBCol>
                          <MDBCol size="6">
                            <MDBInput
                              label="Region"
                              onChange={this.onChange}
                              value={this.state.region}
                              id="region"
                              type="text"
                              className={classnames("", {
                                invalid: errors.region || errors.regionnotfound
                              })}
                              group
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <MDBCol>
                            <MDBInput
                              label="Full Name"
                              onChange={this.onChange}
                              value={this.state.name}
                              id="name"
                              type="text"
                              className={classnames("", {
                                invalid: errors.name || errors.namenotfound
                              })}
                              group
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <MDBCol>
                            <MDBInput
                              label="Email"
                              onChange={this.onChange}
                              value={this.state.email}
                              id="email"
                              type="email"
                              className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                              })}
                              group
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <MDBCol size="6">
                            <MDBInput
                              label="Password"
                              onChange={this.onChange}
                              value={this.state.password}
                              id="password"
                              type="password"
                              className={classnames("", {
                                invalid: errors.password
                              })}
                              group
                            />
                          </MDBCol>
                          <MDBCol size="6">
                            <MDBInput
                              label="Confirm Password"
                              onChange={this.onChange}
                              value={this.state.password2}
                              id="password2"
                              type="password"
                              className={classnames("", {
                                invalid: errors.password2
                              })}
                              group
                            />
                          </MDBCol>
                        </MDBRow>

                      </div>
                      <div className="text-center">
                        <MDBBtn type="submit" >Sign up</MDBBtn>
                      </div>
                    </form>
                    <hr />
                    <p className="font-weight-normal" style={{ textAlign: "center" }}>Already have an account? <a href="#" className="font-weight-bold"><Link to="/login">Login Here!</Link></a></p>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </React.Fragment >
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

/*


              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>


      */