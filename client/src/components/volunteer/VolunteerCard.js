import React, { Component } from "react";
import { MDBBtn, MDBInput } from 'mdbreact';
import API from "../../utils/tournamentAPI";
import { element } from "prop-types";
import Moment from 'react-moment';

class VolunteerCard extends Component {

    constructor(props) {
        // console.group( 'VolunteerCard.constructor()');

        super(props);
        // console.log( '[VolunteerCard.constructor()] this.props:' , this.props );

        this.state = {
          commentary: ''
        }

        this.handleChangeCommentary = this.handleChangeCommentary.bind(this);
        this.handleSubmitCommentary = this.handleSubmitCommentary.bind(this);

        // console.groupEnd();
    }

    componentDidMount() {
        // console.log( '[VolunteerCard.componentDidMount()] this.props:' , this.props );
        // this.loadGame();
    }


    handleChangeCommentary( event ) {
        // console.group( 'VolunteerCard.handleChangeCommentary()');
        // console.log( 'event.target:' , event.target );
        // console.log( 'event.target.name:' , event.target.name );
        // console.log( 'event.target.value:' , event.target.value );
        // console.log( 'this.state:' , this.state );

        this.setState( { commentary: event.target.value } );

        // console.log( 'this.state:' , this.state );
        // console.groupEnd();
    }


    async handleSubmitCommentary( event ) {
        // console.group( 'VolunteerCard.handleSubmitCommentary()');
        // console.log( 'event.target:' , event.target );
        // console.log( 'this.props:' , this.props );
        // console.log( 'this.state:' , this.state );
        event.preventDefault();

        if ( this.state.commentary !== '' ) {
            // notify commentary
            var createCommentaryNotificationData = {
                commentary: this.state.commentary
            };
            var createCommentaryNotificationResponse = await API.createCommentaryNotification( this.props.tournament._id , createCommentaryNotificationData );
            // console.log( 'createCommentaryNotificationResponse.data' , createCommentaryNotificationResponse.data );

            // reset  textbox
            this.setState( { commentary: '' } );
        }

        // console.groupEnd();
    }


    render() {
        return (
            <React.Fragment>
                <li className="list-group-item" style={{ marginBottom: "15px" }}>
                <div className="row">
                    <div className="col-3">
                        <img src={this.props.thumbnail || "https://placehold.it/200x100"} style={{ width: "100%" }} />
                    </div>
                    <div className="col-5">
                        <h3>{this.props.tournament.name}</h3>
                        <h4>Game: {this.props.tournament.game.name}</h4>
                        <h5>Date: <Moment format=" YYYY/MM/DD HH:mm">{this.props.tournament.date}</Moment></h5>

                        <form id="commentary-form">
                            <div className="form-row">
                                <div className="form-group col-12">
                                    {/*<textarea className="form-control" id="commentary-form-commentary" name="commentary" placeholder="Enter commentary here" rows="3"></textarea>*/}
                                    <MDBInput
                                        id="commentary-form-commentary"
                                        name="commentary"
                                        type="textarea"
                                        label="Commentary"
                                        placeholder="Enter commentary here"
                                        value={this.state.commentary}
                                        onChange={this.handleChangeCommentary}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-12 d-flex justify-content-end">
                                    <MDBBtn
                                        id="commentary-form-submit"
                                        onClick={this.handleSubmitCommentary}
                                    >
                                    Submit
                                    </MDBBtn>
                                </div>
                            </div>
                        </form>

                    </div>
                    {
                        (
                            // return live brackets where user is assigned
                            this.props.tournament.brackets.filter(
                                ( bracket , bracketIndex ) => {
                                    return (
                                        ( this.props.tournament.status === 'running' ) &&
                                        ( bracket.judges.indexOf( this.props.userid ) > -1 )
                                    );
                                }
                            )
                            .map(
                                ( bracket , bracketIndex ) => {
                                    // console.log( '[VolunteerCard.render()] bracketIndex' , bracketIndex );
                                    // console.log( '[VolunteerCard.render()] bracket._id' , bracket._id );
                                    // console.log( '[VolunteerCard.render()] bracket.name' , bracket.name );
                                    return (
                                        <React.Fragment key={`bracket-${bracket._id}-ReactFragment`} >
                                            <div className="col-4" style={{textAlign: "center"}}>
                                            {
                                                bracket.matches.map(
                                                    ( match , matchIndex ) => {
                                                        // console.log( '[VolunteerCard.render()] matchIndex' , matchIndex );
                                                        // console.log( '[VolunteerCard.render()] match._id' , match._id );
                                                        // console.log( '[VolunteerCard.render()] match.name' , match.name );
                                                        // console.log( '[VolunteerCard.render()] match.status' , match.status );
                                                        return(
                                                            <React.Fragment key={`match-${match._id}-ReactFragment`} >
                                                                {
                                                                    <div>
                                                                        <button
                                                                            className="btn btn-primary"
                                                                            id={`match-${match._id}-button`}
                                                                            onClick={
                                                                                ( event ) => {
                                                                                    this.props.openmodal( this.props.tournament._id , bracket._id , match._id , match );
                                                                                }
                                                                            }
                                                                            disabled={ !( match.status === 'ready' ) }
                                                                        >
                                                                        {match.name}
                                                                        </button>
                                                                    </div>
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    }
                                                )
                                            }
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            )
                        )
                    }
                </div>
            </li>
            </React.Fragment>
        );
    }
}

export default VolunteerCard;
