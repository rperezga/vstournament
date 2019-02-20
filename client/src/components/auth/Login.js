import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBInput,
  MDBBtn
} from 'mdbreact'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment >

        <MDBCard style={{ width: "30rem", margin: "0 auto" }}>
          <MDBCardImage className="img-fluid" src="./login.jpg" waves />
          <MDBCardBody>
            <MDBCardTitle>Sign in</MDBCardTitle>
            <hr />
            <MDBCardText>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="grey-text">

                  <MDBInput
                    label="Type your email"
                    onChange={this.onChange}
                    value={this.state.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                    group
                  />

                  <MDBInput
                    label="Type your password"
                    group
                    type="password"
                    id="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                  />

                </div>
                <div className="text-center">
                  <MDBBtn type="submit" >Sign in</MDBBtn>
                </div>
              </form>
              <hr />
              <p className="font-weight-normal" style={{ textAlign: "center" }}>Do not have an account. <a href="#" className="font-weight-bold"><Link to="/register">Register Here!</Link></a></p>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
