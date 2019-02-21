import React, { Component } from "react";
import API from "../../utils/tournamentAPI";
import { element } from "prop-types";
import Moment from 'react-moment';

class VolunteerCard extends Component {

    constructor(props) {
        super(props);
        // console.log( '[VolunteerCard.constructor()] this.props:' , this.props );

        this.state = {
          // game: {}
        }
    }

    componentDidMount() {
        // console.log( '[VolunteerCard.componentDidMount()] this.props:' , this.props );
        // this.loadGame();
    }

    // loadGame = () => {
    //     API.getGame(this.props.game._id)
    //         .then(res => {
    //             this.setState({ game: res.data });
    //             console.log(this.state.game)
    //         }
    //         )
    //         .catch(err => console.log(err));
    // };

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
