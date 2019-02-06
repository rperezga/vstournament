import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Moment from 'react-moment';

class CardTournament extends Component {
    render() {
        return (
            <MDBCol>
                <MDBCard style={{ width: "17rem", marginBottom: "20px" }}>
                    <MDBCardImage className="img-fluid" src={this.props.thumbnail || "https://placehold.it/400x170"} waves />
                    <MDBCardBody>
                        <MDBCardTitle style={{ fontSize: '1.2em' }}>{this.props.name}</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                Date:
                                <Moment format=" YYYY/MM/DD HH:mm" >
                                    {this.props.date}
                                </Moment>
                            </div>
                            <div>
                                Game: {this.props.game}
                            </div>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default CardTournament;
