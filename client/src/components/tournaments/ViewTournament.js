import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBCard, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import API from "../../utils/tournamentAPI";
import { connect } from "react-redux";

import ReactTwitchEmbedVideo from "react-twitch-embed-video"

class ViewTournament extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournament: {},
            userId: '',
            asVolunteer: false,
            asPlayer: false,
            tab: 'brackets',
            tabBrackets: 'nav-link active',
            tabPlayers: 'nav-link',
            tabUpdates: 'nav-link',
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        API.getUser(this.props.auth.user.id).then(res => {
            this.setState({ userId: res.data.user._id });
            this.loadTournament();
        });
    }

    handleClick(event) {
        const id = event.target.id;
        this.setState({
            tab: id
        })
        if (id === 'brackets') {
            this.setState({
                tabBrackets: 'nav-link active',
                tabPlayers: 'nav-link',
                tabUpdates: 'nav-link'
            })
        } else if (id === 'players') {
            this.setState({
                tabBrackets: 'nav-link',
                tabPlayers: 'nav-link active',
                tabUpdates: 'nav-link'
            })
        } else if (id === 'updates') {
            this.setState({
                tabBrackets: 'nav-link',
                tabPlayers: 'nav-link',
                tabUpdates: 'nav-link active'
            })
        }
    }

    loadTournament = () => {
        const data = API.getTournament(this.props.match.params.id)
            .then(res => {
                this.setState({ tournament: res.data });

                console.log(this.state.tournament)

                if (res.data.judges.find(judge => judge.user === this.props.auth.user.id)) {
                    this.setState({ asVolunteer: true })
                }

                if (res.data.players.find(player => player.user === this.props.auth.user.id)) {
                    this.setState({ asPlayer: true })
                }
            }
            )
            .catch(err => console.log(err));
    };

    volunteer = () => {
        const data = API.subsVolunteer(this.state.tournament.id, { id: this.state.userId })
            .then(res => {
                this.setState({ asVolunteer: true })
                alert("You have been subscribed as a volunteer")
            })
            .catch(err => console.log(err));
    };

    player = () => {
        const data = API.subsPlayer(this.state.tournament.id, { id: this.state.userId })
            .then(res => {
                this.setState({ asPlayer: true })
                alert("You have been subscribed as a player")
            })
            .catch(err => console.log(err));
    };



    render() {
        return (
            <div>

                <Link to="/" style={{ margin: "50px" }}> <i className="fas fa-arrow-left" /> Back to tournaments </Link>

                <div style={{ width: '94%', margin: "30px auto" }}>

                    <MDBCard style={{ padding: "30px" }}>
                        <div style={{ textAlign: "right", margin: '10px', }}>
                            {(this.props.auth.user.id && this.state.tournament.status === 'open') ?
                                <div>
                                    {this.state.asVolunteer ?
                                        <MDBBtn color="secondary" onClick={this.volunteer} disabled>Volunteer</MDBBtn> :
                                        <MDBBtn color="secondary" onClick={this.volunteer} >Volunteer</MDBBtn>
                                    }
                                    {this.state.asPlayer ?
                                        <MDBBtn color="success" onClick={this.player} disabled>Register</MDBBtn> :
                                        <MDBBtn color="success" onClick={this.player} >Register</MDBBtn>
                                    }
                                </div> :
                                ""}

                            {(this.props.auth.user.id && this.state.tournament.status === 'running') ?
                                <div style={{ position: 'relative', width: '800px', margin: '0 auto' }}>
                                    <ReactTwitchEmbedVideo channel={this.state.tournament.channel} />
                                </div>

                                :
                                ""}
                        </div>

                        <hr />

                        <h4 style={{ margin: "0 0 20px 20px" }}>{this.state.tournament.name}</h4>

                        <div>
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className={this.state.tabBrackets} id="brackets" onClick={this.handleClick}>Brackets</a>
                                </li>
                                <li className="nav-item">
                                    <a className={this.state.tabPlayers} id="players" onClick={this.handleClick}>Players</a>
                                </li>
                                <li className="nav-item">
                                    <a className={this.state.tabUpdates} id="updates" onClick={this.handleClick}>Updates</a>
                                </li>
                            </ul>
                        </div>

                        {this.state.tab == 'players' ?

                            <MDBTable>
                                <MDBTableHead>
                                    <tr>
                                        <th>Player Name</th>
                                        <th>Team</th>
                                        <th>Region</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {this.state.tournament.players.map((player) =>
                                        <tr>
                                            <td>{player.user}</td>
                                        </tr>
                                    )}
                                </MDBTableBody>
                            </MDBTable>
                            :
                            ""
                        }





                    </MDBCard>


                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ViewTournament);

