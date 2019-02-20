import React, { Component } from 'react';
import './match.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

class Match extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <MDBContainer style={{ width: "25rem" }}>
                <MDBRow style={{ backgroundColor: "gray" }} >

                    {this.props.win === '1' ?
                        <MDBCol size="5" style={{ paddingTop: '10px', textAlign: "center" }}  > <h4 style={{ border: "1px double white" }}>{this.props.player1} - <span>{this.props.point1}</span></h4></MDBCol> :
                        <MDBCol size="5" style={{ paddingTop: '10px', textAlign: "center" }}  > <h4 >{this.props.player1} - <span>{this.props.point1}</span></h4></MDBCol>
                    }

<MDBCol style={{marginTop:"15px"}} size="2" > <img src="../favicon.png" className="img-fluid" alt="" /></MDBCol>

                    {this.props.win === '2' ?
                        <MDBCol size="5" style={{ paddingTop: '10px', textAlign: "center" }}  > <h4 style={{ border: "1px double white" }}>{this.props.player2} - <span>{this.props.point2}</span></h4></MDBCol> :
                        <MDBCol size="5" style={{ paddingTop: '10px', textAlign: "center" }}  > <h4 >{this.props.player2} - <span>{this.props.point2}</span></h4></MDBCol>
                    }

                </MDBRow>                
            </MDBContainer>
            
        );
    }
}

export default Match;