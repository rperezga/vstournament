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
        console.log(this.props)
    }

    loadGame = () => {
        API.getGame(this.props.game)
            .then(res => {
                this.setState({ game: res.data });
                console.log(this.state.game)
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
                    <div className="col-4" style={{textAlign: "center"}}>
                    {this.props.match ? <button className="btn btn-primary" id="savebtn" dataid={this.props.matchId} onClick={()=>{ this.props.toggle()}}>{this.props.match}</button>  : ''}
                    
                    </div>
                </div>
            </li>
            </React.Fragment>
        );
    }
}

export default VolunteerCard;
