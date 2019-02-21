import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

class Match extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <MDBContainer style={{ width: "25rem" }}>
                <MDBRow style={{ border: "5px double rgba(28,110,164,0.15)", borderRadius: "10px", background: "rgba(145,159,170,0.13) none no-repeat scroll -18px 19px" }} >

                    {this.props.win === '1' ?
                        <MDBCol size="5" style={{ paddingTop: '10px', textAlign: "center" }}>
                            <MDBRow>
                                <MDBCol size="9">
                                    <h4>{this.props.player1}</h4>
                                </MDBCol>
                                <MDBCol size="2">
                                    <h4>{this.props.point1}</h4>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol> :
                        <MDBCol size="5" style={{ paddingTop: '10px', textAlign: "center" }}>
                            <MDBRow>
                                <MDBCol size="9">
                                    <h4>{this.props.player1}</h4>
                                </MDBCol>
                                <MDBCol size="2">
                                    <h4>{this.props.point1}</h4>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    }

                    <MDBCol style={{ marginTop: "20px" }} size="2" > <img src="../favicon.png" className="img-fluid" alt="" /></MDBCol>

                    {this.props.win === '2' ?
                        <MDBCol size="5" style={{ paddingTop: '10px', textAlign: "center" }}>
                            <MDBRow>
                                <MDBCol size="9">
                                    <h4>{this.props.player2}</h4>
                                </MDBCol>
                                <MDBCol size="2">
                                    <h4>{this.props.point2}</h4>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol> :
                        <MDBCol size="5" style={{ paddingTop: '10px', textAlign: "center" }}>
                            <MDBRow>
                                <MDBCol size="9">
                                    <h4>{this.props.player2}</h4>
                                </MDBCol>
                                <MDBCol size="2">
                                    <h4>{this.props.point2}</h4>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    }

                </MDBRow>
            </MDBContainer>

        );
    }
}

export default Match;