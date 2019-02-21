import React, { Component } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import API from '../../utils/matchAPI';

class InputMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: {},
            player1: '',
            player2: '',

        }
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmitClick = e => {
        this.data = { player1: this.state.player1, player2: this.state.player2 }
        API.updateMatch(this.props.matchid, this.data).then(res => {
            { this.props.toggle() };

        })
    };

    render() {
        return (

            <MDBContainer style={{ width: "25rem" }}>

                <form style={{ width: "100%" }}>
                    <div>
                        <MDBRow  >
                            <MDBCol size="5">
                                <MDBInput
                                    onChange={this.onChange}
                                    label={this.props.player1}
                                    value={this.state.player1}
                                    id="player1"
                                    name="player1"
                                    type="number"
                                    group
                                />
                            </MDBCol>
                            <MDBCol size="2" > <img src="./favicon.png" className="img-fluid" alt="" /></MDBCol>
                            <MDBCol size="5">
                                <MDBInput
                                    onChange={this.onChange}
                                    label={this.props.player2}
                                    value={this.state.player2}
                                    id="player2"
                                    name="player2"
                                    type="number"
                                    group
                                />
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <div style={{ textAlign: "center" }}><MDBBtn onClick={this.onSubmitClick}>Submit</MDBBtn></div>

                </form>
            </MDBContainer>
        )
    }
}


export default InputMatch