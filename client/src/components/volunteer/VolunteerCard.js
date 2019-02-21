import React, { Component } from "react";
import API from "../../utils/tournamentAPI";

class VolunteerCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {}
        }
    }

    componentDidMount() {
        this.loadGame();
    }

    loadGame = () => {
        API.getGame(this.props.game)
            .then(res => {
                this.setState({ game: res.data });
            }
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <React.Fragment>
                <li className="list-group-item" style={{ marginBottom: "15px" }}>
                    <div className="row">
                        <div className="col-3">
                            <img src={this.props.thumbnail || "https://placehold.it/200x100"} style={{ width: "100%" }} />
                        </div>
                        <div className="col-5">
                            <h3>{this.props.name}</h3>
                            <h4>Game: {this.state.game.name}</h4>
                            {this.props.brackets ? <h5>Bracket: {this.props.brackets}</h5> : ''}
                        </div>

                        {this.props.matchName ?
                            <div className="col-4"> {this.props.matchName.map((element, index) => {
                                return (<div style={{ textAlign: "center" }}>
                                    {element && (!this.props.player1[index].isBye && !this.props.player2[index].isBye) ? <button style={{ width: "100%" }} className="btn btn-primary" id="savebtn" dataid={this.props.matchId[index]} onClick={() => { this.props.toggle() }}>{element}</button> : ''}
                                </div>)
                            })}
                            </div>
                            : ""
                        }
                    </div>
                </li>
            </React.Fragment>
        );
    }
}

export default VolunteerCard;
