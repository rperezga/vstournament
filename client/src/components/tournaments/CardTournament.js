import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

class CardTournament extends Component {
    render() {
        return (
            <React.Fragment>

                <Link to={"/viewtournament/" + this.props.id} >
                    <MDBCard style={{ width: "20rem", margin: "20px" }}>
                        <MDBCardImage className="img-fluid" src={this.props.thumbnail || "https://placehold.it/400x170"} waves />

                        <div>
                            <p style={{ float: "right", backgroundColor: "#33b5e5", color: "white", padding: "6px 30px", marginTop: "-120px", zIndex: "100", position: "relative", marginRight: "10px" }}>{this.props.status}</p>
                        </div>

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
                                <div>
                                    Venue: {this.props.venue}
                                </div>
                                <div>
                                    Address: {this.props.address}
                                </div>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </Link>
            </React.Fragment>
        );
    }
}

export default CardTournament;
