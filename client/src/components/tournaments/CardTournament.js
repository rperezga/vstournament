import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

class CardTournament extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to={"/viewtournament/" + this.props.id} params={{id: this.props.id}}>
                    <MDBCard style={{ width: "17rem", margin: "20px" }}>
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
                </Link>
            </React.Fragment>
        );
    }
}

export default CardTournament;
