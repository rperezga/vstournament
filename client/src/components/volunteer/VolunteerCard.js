import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

class VolunteerCard extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>{this.props.name}</h1>
            </React.Fragment>
        );
    }
}

export default VolunteerCard;
