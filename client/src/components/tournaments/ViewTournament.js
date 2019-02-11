import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import API from "../../utils/tournamentAPI";
import { connect } from "react-redux";

class ViewTournament extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournament: {},
            userId: '',
            asVolunteer: false,
            asPlayer: false
        }
    }

    componentDidMount() {
        API.getUser(this.props.auth.user.id).then(res => {
            this.setState({ userId: res.data.user._id });
            this.loadTournament();
        });
    }

    loadTournament = () => {
        const data = API.getTournament(this.props.match.params.id)
            .then(res => {
                this.setState({ tournament: res.data });
               
                if(res.data.judges.find(judge => judge.user === this.props.auth.user.id)){
                    this.setState({asVolunteer: true})
                }

                if(res.data.players.find(player => player.user === this.props.auth.user.id)){
                    this.setState({asPlayer: true})
                }
            }
            )
            .catch(err => console.log(err));
    };

    volunteer = () => {
        const data = API.subsVolunteer(this.state.tournament.id, {id: this.state.userId} )
            .then(res => {
                this.setState({asVolunteer: true})
                alert("You have been subscribed as a volunteer")
            })
            .catch(err => console.log(err));
    };

    player = () => {
        const data = API.subsPlayer(this.state.tournament.id, {id: this.state.userId} )
            .then(res => {
                this.setState({asPlayer: true})
                alert("You have been subscribed as a player")
            })
            .catch(err => console.log(err));
    };



    render() {
        return (

            <MDBContainer className="mt-5">

                <Link to="/"> <i className="fas fa-arrow-left" /> Back to tournaments </Link>

                <MDBRow style={{ marginTop: "20px" }}>
                    <MDBCol>
                        <MDBJumbotron>

                            <div style={{ textAlign: "right" }}>
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
                            </div>

                            <h2 className="h1 display-3">{this.state.tournament.name}</h2>

                            <p className="lead">
                                This is a simple hero unit, a simple Jumbotron-style component for
                                calling extra attention to featured content or information.
                                </p>
                            <hr className="my-2" />
                            <p>
                                It uses utility classes for typgraphy and spacing to space content out
                                within the larger container.
                                </p>
                            <p className="lead">
                                <MDBBtn color="primary">Learn More</MDBBtn>
                            </p>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ViewTournament);

