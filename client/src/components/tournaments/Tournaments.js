import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        const data = API.getTournaments()
            .then(res => {
                this.setState({ tournaments: res.data });
                console.log(this.state.tournaments)
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
                        return (
                            <CardTournament
                                id={tournament._id}
                                name={tournament.name}
                                date={tournament.date}
                                game={tournament.game}
                            />
                        )
                    })}
                </div>

                <hr />

                <h4>Upcoming Tournaments</h4>
                <div className="d-flex align-content-stretch flex-wrap bd-highlight example-parent">

                    {this.state.tournaments.map((tournament, index) => {
                        return (
                            <CardTournament
                                id={tournament._id}
                                name={tournament.name}
                                date={tournament.date}
                                game={tournament.game}
                            />
                        )
                    })}
                </div>

                <hr />

                <h4>Recently Finished </h4>
                <div className="d-flex align-content-stretch flex-wrap bd-highlight example-parent">

                    {this.state.tournaments.map((tournament, index) => {
                        return (
                            <CardTournament
                                id={tournament._id}
                                name={tournament.name}
                                date={tournament.date}
                                game={tournament.game}
                            />
                        )
                    })}
                </div>

            </div>
        );
    }
}
export default Tournaments;