import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBCard, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import API from "../../utils/tournamentAPI";
import { connect } from "react-redux";
import Bracket from '../brackets/Brackets'

import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import { subscribeToTimer } from '../../socket';

import Notification from '../notifications/Notifications';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ViewTournament extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournament: {},
            bracketState: false,
            userId: '',
            asVolunteer: false,
            asPlayer: false,
            tab: 'brackets',
            tabBrackets: 'nav-link active',
            tabPlayers: 'nav-link',
            tabUpdates: 'nav-link',
            notifications: []
        }
        this.handleClick = this.handleClick.bind(this);

        subscribeToTimer((value) => {
            let response = value.fullDocument;
            if (this.state.tournament._id == response.tournament) {
                toast(response.message);
                this.setState((prevState, props) => {
                    return ({ notifications: [...prevState.notifications, response] });
                })
            }
        });
    }

    componentDidMount() {
        API.getUser(this.props.auth.user.id).then(res => {
            this.setState({ userId: res.data.user._id });
            API.getTournament(this.props.match.params.id)
                .then(res => {
                    this.setState({ tournament: res.data });

                    if (this.state.tournament.brackets.length > 0) {
                        this.setState({ bracketState: true })
                    }

                    if (res.data.judges.find(judge => judge.user._id === this.props.auth.user.id)) {
                        this.setState({ asVolunteer: true })
                    }

                    if (res.data.players.find(player => player.user._id === this.props.auth.user.id)) {
                        this.setState({ asPlayer: true })
                    }
                    if (this.state.tournament.notifications.length > 0) {
                        this.setState((prevState, props) => {
                            return { notifications: this.state.tournament.notifications }

                        }, () => {
                            console.log(this.state.notifications)
                        })
                    }


                }
                )
                .catch(err => console.log(err));
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

    volunteer = () => {
        API.subsVolunteer(this.state.tournament._id, { id: this.state.userId })
            .then(res => {
                this.setState({ asVolunteer: true })
                this.loadTournament()
                alert("You have been subscribed as a volunteer")
            })
            .catch(err => console.log(err));
    };

    player = () => {
        API.subsPlayer(this.state.tournament._id, { id: this.state.userId })
            .then(res => {
                this.setState({ asPlayer: true })
                this.loadTournament()
                alert("You have been subscribed as a player")
            })
            .catch(err => console.log(err));
    };


    render() {
        return (
            <React.Fragment>
                <ToastContainer />

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
                                    ""
                                }

                                {(this.props.auth.user.id && this.state.tournament.status === 'running') ?
                                    <div style={{ position: 'relative', width: '800px', margin: '0 auto' }}>
                                        <ReactTwitchEmbedVideo channel={this.state.tournament.channel} />
                                        <hr />
                                    </div>
                                    :
                                    ""
                                }
                            </div>



                            <h4 style={{ margin: "0 0 20px 20px" }}>{this.state.tournament.name}</h4>

                            <div>
                                <ul className="nav nav-tabs">
                                    {this.state.tournament.status === 'open' || this.state.tournament.status === 'new' ?
                                        "" :
                                        <li className="nav-item">
                                            <a className={this.state.tabBrackets} id="brackets" onClick={this.handleClick}>Brackets</a>
                                        </li>
                                    }

                                    <li className="nav-item">
                                        <a className={this.state.tabPlayers} id="players" onClick={this.handleClick}>Players</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={this.state.tabUpdates} id="updates" onClick={this.handleClick}>Updates</a>
                                    </li>
                                </ul>
                            </div>

                            {this.state.tab == 'brackets' && this.state.bracketState
                                ?
                                <div>
                                    {this.state.tournament.status === 'open' || this.state.tournament.status === 'new' ? "" :
                                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                            <Bracket matches={this.state.tournament.brackets[0].matches} />
                                        </div>
                                    }
                                </div>
                                :
                                ""
                            }

                            {this.state.tab == 'brackets' && !this.state.bracketState ?
                                <div>
                                    {this.state.tournament.status === 'open' || this.state.tournament.status === 'new' ? "" :
                                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                            <h3>Any bracket to show!</h3>
                                        </div>
                                    }
                                </div>

                                :
                                ""
                            }

                            {this.state.tab == 'players' && this.state.tournament.players.length > 0 ?

                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Player Name</th>
                                            <th>Team</th>
                                            <th>Region</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.state.tournament.players.map((player) =>
                                            <tr>
                                                <td>{player.user.name}</td>
                                                <td>{player.user.playerName}</td>
                                                <td>{player.user.team}</td>
                                                <td>{player.user.region}</td>
                                            </tr>
                                        )}
                                    </MDBTableBody>
                                </MDBTable>
                                :
                                ""
                            }

                            {this.state.tab == 'players' && this.state.tournament.players.length == 0 ?

                                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                    <h3>Any player registered yet!</h3>
                                </div>
                                :
                                ""
                            }

                            {this.state.tab == 'updates' && this.state.notifications.length > 0 ?
                                <div>
                                    {this.state.notifications.map(notification => {
                                        return <div>
                                            {this.state.tournament._id == notification.tournament ?
                                                <Notification
                                                    ntfType={notification.notificationType}
                                                    ntfDate={notification.date}
                                                    ntfMessage={notification.message}
                                                />
                                                : ""
                                            }
                                        </div>
                                    })}
                                </div>
                                :
                                ""
                            }

                            {this.state.tab == 'updates' && this.state.notifications.length == 0 ?
                                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                    <h3>Any notification yet!</h3>
                                </div>
                                :
                                ""
                            }
                        </MDBCard>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ViewTournament);

