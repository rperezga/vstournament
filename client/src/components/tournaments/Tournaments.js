import React, { Component } from "react";
import API from "../../utils/tournamentAPI";
import CardTournament from "./CardTournament"

class Tournaments extends Component {

    state = {
        tournaments: []
    }

    componentDidMount() {
        this.loadAllTournaments();
    }

    loadAllTournaments = () => {
        API.getTournaments()
            .then(res => {
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
                            return (
                                <CardTournament
                                    id={tournament._id}
                                    name={tournament.name}
                                    date={tournament.date}
                                    game={tournament.game.name}
                                    venue={tournament.venue}
                                    address={tournament.address}
                                    status={tournament.status}
                                />
                            )
                        }
                    })}
                </div>

                <hr />

                <h4>Upcoming Tournaments</h4>
                <div className="d-flex align-content-stretch flex-wrap bd-highlight example-parent">

                    {this.state.tournaments.map((tournament, index) => {
                        if (tournament.status === 'new' || tournament.status === 'open' || tournament.status === 'closed' || tournament.status === 'ready') {
                            return (
                                <CardTournament
                                    id={tournament._id}
                                    name={tournament.name}
                                    date={tournament.date}
                                    game={tournament.game.name}
                                    venue={tournament.venue}
                                    address={tournament.address}
                                    status={tournament.status}
                                />
                            )
                        }
                    })}
                </div>

                <hr />

                <h4>Recently Finished </h4>
                <div className="d-flex align-content-stretch flex-wrap bd-highlight example-parent">

                    {this.state.tournaments.map((tournament, index) => {
                        if (tournament.status === 'finished') {
                            return (
                                <CardTournament
                                    id={tournament._id}
                                    name={tournament.name}
                                    date={tournament.date}
                                    game={tournament.game.name}
                                    venue={tournament.venue}
                                    address={tournament.address}
                                    status={tournament.status}
                                />
                            )
                        }
                    })}
                </div>

            </div>
        );
    }
}
export default Tournaments;
