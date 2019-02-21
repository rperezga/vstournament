import React, { Component } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import API from '../../utils/matchAPI';
import tournamentAPI from '../../utils/tournamentAPI';

class InputMatch extends Component {


    constructor(props) {
        // console.group( 'InputMatch.constructor()');

        super(props);
        // console.log( '[InputMatch.constructor()] this.props:' , this.props );

        this.state = {
            player1Score: 0 ,
            player2Score: 0 ,
            enableSubmit: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        // console.groupEnd();
    }


    handleChange( event ) {
        // console.group( 'InputMatch.handleChange()');
        // console.log( 'event.target:' , event.target );
        // console.log( 'event.target.name:' , event.target.name );
        // console.log( 'event.target.value:' , event.target.value );
        // console.log( 'this.state:' , this.state );

        var newState = {};
        newState[ event.target.name ] = event.target.value;
        // console.log( 'newState:' , newState );
        this.setState( newState );

        // console.log( 'this.state:' , this.state );
        // console.groupEnd();
    }


    handleBlur( event ) {
        // console.group( 'InputMatch.handleBlur()');
        console.log( 'event.target:' , event.target );
        // console.log( 'event.target.name:' , event.target.name );
        // console.log( 'event.target.value:' , event.target.value );
        // console.log( 'this.state:' , this.state );


        // check for valid scores
        var newState = {
            enableSubmit: ( this.state.player1Score &&  this.state.player2Score && ( this.state.player1Score !== this.state.player2Score ) )
        };
        // console.log( 'newState:' , newState );
        this.setState( newState );

        // console.log( 'this.state:' , this.state );
        // console.groupEnd();
    }


    async handleSubmit( event ) {
        // console.group( 'InputMatch.onSubmitClick()');
        // console.log( 'event.target:' , event.target );
        // console.log( 'this.props:' , this.props );
        // console.log( 'this.state:' , this.state );
        event.preventDefault();

        // update match
        var updateMatchData = {
            player1: this.state.player1Score ,
            player2: this.state.player2Score
        };
        var updateMatchResponse = await API.updateMatch( this.props.matchid, updateMatchData );
        // console.log( 'updateMatchResponse.data' , updateMatchResponse.data );

        // advance players
        var applyAdvanceRuleData = {
            bracketId: this.props.bracketid ,
            matchId: this.props.matchid ,
        };
        var applyAdvanceRuleDataResponse = await tournamentAPI.advancePlayers( this.props.tournamentid , applyAdvanceRuleData );
        // console.log( 'applyAdvanceRuleDataResponse.data' , applyAdvanceRuleDataResponse.data );

        // notify result
        var createResultNotificationData = {
            bracketId: this.props.bracketid ,
            matchId: this.props.matchid ,
        };
        var acreateResultNotificationResponse = await tournamentAPI.createResultNotification( this.props.tournamentid , createResultNotificationData );
        // console.log( 'acreateResultNotificationResponse.data' , acreateResultNotificationResponse.data );

        this.props.closemodal();

        // console.groupEnd();
    }


    render() {
        return (

            <MDBContainer style={{ width: "25rem" }}>
                <form style={{ width: "100%" }}>

                    <div>
                        <MDBRow  >
                            <MDBCol size="5">
                                <MDBInput
                                    id="player-1-score"
                                    name="player1Score"
                                    label={this.props.match.player1.user.playerName}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                />
                            </MDBCol>
                            <MDBCol size="2" > <img src="./favicon.png" className="img-fluid" alt="" /></MDBCol>
                            <MDBCol size="5">
                                <MDBInput
                                    id="player-2-score"
                                    name="player2Score"
                                    label={this.props.match.player2.user.playerName}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                />
                            </MDBCol>
                        </MDBRow>
                    </div>
                    <div style={{ textAlign: "center" }}><MDBBtn onClick={this.handleSubmit} disabled={!this.state.enableSubmit}>Submit</MDBBtn></div>

                </form>
            </MDBContainer>
        )
    }
}


export default InputMatch
