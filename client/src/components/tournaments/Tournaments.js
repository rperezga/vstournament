import React, { Component } from "react";
import API from "../../utils/tournamentAPI";

import CardTournament from "./CardTournament"

class Tournaments extends Component {

    state = {
        tournaments: [],
        organizer: ''
    }

    componentDidMount() {
        this.loadAllTournaments(this.state.organizer);
    }

    loadAllTournaments = () => {
        API.getTournaments()
            .then(res => {
                console.log(res.data)
                this.setState({ tournaments: res.data });
            }
            )
            .catch(err => console.log(err));
    };


    render() {
        return (
            <div style={{ width: "94%", marginLeft: "3%" }}>
                <h4>Live Tournaments</h4>
                <div className="d-flex align-content-stretch flex-wrap bd-highlight example-parent">

                    {this.state.tournaments.map((tournament, index) => {
                        if (tournament.status === 'running') {
                            if(tournament.game){
                                return (
                                    <CardTournament
                                        id={tournament._id}
                                        name={tournament.name}
                                        date={tournament.date}
                                        game={tournament.game.name}
                                        venue={tournament.venue}
                                        address={tournament.address}
                                    />
                                )
                            }else{
                                return (
                                    <CardTournament
                                        id={tournament._id}
                                        name={tournament.name}
                                        date={tournament.date}
                                        venue={tournament.venue}
                                        address={tournament.address}
                                    />
                                )
                            }                            
                        }
                    })}
                </div>

                <hr />

                <h4>Upcoming Tournaments</h4>
                <div className="d-flex align-content-stretch flex-wrap bd-highlight example-parent">

                    {this.state.tournaments.map((tournament, index) => {
                        if (tournament.status === 'new') {
                            if(tournament.game){
                                return (
                                    <CardTournament
                                        id={tournament._id}
                                        name={tournament.name}
                                        date={tournament.date}
                                        game={tournament.game.name}
                                        venue={tournament.venue}
                                        address={tournament.address}
                                    />
                                )
                            }else{
                                return (
                                    <CardTournament
                                        id={tournament._id}
                                        name={tournament.name}
                                        date={tournament.date}
                                        venue={tournament.venue}
                                        address={tournament.address}
                                    />
                                )
                            } 
                        }else if (tournament.status === 'open') {
                            if(tournament.game){
                                return (
                                    <CardTournament
                                        id={tournament._id}
                                        name={tournament.name}
                                        date={tournament.date}
                                        game={tournament.game.name}
                                        venue={tournament.venue}
                                        address={tournament.address}
                                        btn={'true'}
                                    />
                                )
                            }else{
                                return (
                                    <CardTournament
                                        id={tournament._id}
                                        name={tournament.name}
                                        date={tournament.date}
                                        venue={tournament.venue}
                                        address={tournament.address}
                                        btn={'true'}
                                    />
                                )
                            } 
                        }
                    })}
                </div>

                <hr />

                <h4>Recently Finished </h4>
                <div className="d-flex align-content-stretch flex-wrap bd-highlight example-parent">

                    {this.state.tournaments.map((tournament, index) => {
                        if (tournament.status === 'closed') {
                            if(tournament.game){
                                return (
                                    <CardTournament
                                        id={tournament._id}
                                        name={tournament.name}
                                        date={tournament.date}
                                        game={tournament.game.name}
                                        venue={tournament.venue}
                                        address={tournament.address}
                                    />
                                )
                            }else{
                                return (
                                    <CardTournament
                                        id={tournament._id}
                                        name={tournament.name}
                                        date={tournament.date}
                                        venue={tournament.venue}
                                        address={tournament.address}
                                    />
                                )
                            } 
                        }
                    })}
                </div>

            </div>
        );
    }
}
export default Tournaments;