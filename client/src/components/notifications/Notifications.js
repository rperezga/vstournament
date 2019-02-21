import React, { Component } from "react";
import { MDBAlert, MDBRow, MDBCol } from 'mdbreact';
import Moment from 'react-moment';

class Notification extends Component {

    render() {
        return (
            <div className="container" style={{ margin: "20px" }}>
                {this.props.ntfType === 'result' ?
                    <MDBAlert color="primary">
                        <MDBRow>
                            <MDBCol size="3">
                                <Moment format=" YYYY/MM/DD HH:mm">{this.props.ntfDate}</Moment>
                            </MDBCol>
                            <MDBCol size="2">
                                Result
                            </MDBCol>
                            <MDBCol size="7">
                                {this.props.ntfMessage}
                            </MDBCol>
                        </MDBRow>
                    </MDBAlert>
                    : ""
                }

                {this.props.ntfType === 'advances' ?
                    <MDBAlert color="success">
                        <MDBRow>
                            <MDBCol size="3">
                                <Moment format=" YYYY/MM/DD HH:mm">{this.props.ntfDate}</Moment>
                            </MDBCol>
                            <MDBCol size="2">
                                Advances
                            </MDBCol>
                            <MDBCol size="7">
                                {this.props.ntfMessage}
                            </MDBCol>
                        </MDBRow>
                    </MDBAlert>
                    : ""
                }

                {this.props.ntfType === 'eliminated' ?
                    <MDBAlert color="danger">
                        <MDBRow>
                            <MDBCol size="3">
                                <Moment format=" YYYY/MM/DD HH:mm">{this.props.ntfDate}</Moment>
                            </MDBCol>
                            <MDBCol size="2">
                                Eliminated
                            </MDBCol>
                            <MDBCol size="7">
                                {this.props.ntfMessage}
                            </MDBCol>
                        </MDBRow>
                    </MDBAlert>
                    : ""
                }

                {this.props.ntfType === 'commentary' ?
                    <MDBAlert color="warning">
                        <MDBRow>
                            <MDBCol size="3">
                                <Moment format=" YYYY/MM/DD HH:mm">{this.props.ntfDate}</Moment>
                            </MDBCol>
                            <MDBCol size="2">
                                Commentary
                            </MDBCol>
                            <MDBCol size="7">
                                {this.props.ntfMessage}
                            </MDBCol>
                        </MDBRow>
                    </MDBAlert>
                    : ""
                }

            </div>
        );
    }
}

export default Notification;

