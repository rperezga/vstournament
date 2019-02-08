import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

class VolunteerCard extends Component {
    render() {
        return (
            <React.Fragment>
                <hi>{this.props.name}</hi>
            </React.Fragment>
        );
    }
}

export default VolunteerCard;
