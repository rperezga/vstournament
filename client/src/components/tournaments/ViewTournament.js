import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import API from "../../utils/tournamentAPI";
import { connect } from "react-redux";

class ViewTournament extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tournament: {}
        }
    }


    componentDidMount() {
        this.loadTournament();
        console.log(`USER: ${this.props.auth.user.id}`)
    }

    loadTournament = () => {
        const data = API.getTournament(this.props.match.params.id)
            .then(res => {
                this.setState({ tournament: res.data });
                console.log(this.state.tournament)
            }
            )
            .catch(err => console.log(err));
    };




    render() {
        return (

            <MDBContainer className="mt-5">                

                <Link to="/"> <i className="fas fa-arrow-left" /> Back to tournaments </Link>

                <div style={{ textAlign: "right" }}>
                    { this.props.auth.user.id ? <MDBBtn>Judge Volunteer</MDBBtn> : "" }
                </div>

                <MDBRow style={{ marginTop: "20px" }}>
                    <MDBCol>
                        <MDBJumbotron>
                            {/* <i className="far fa-edit" style={{ fontSize: '1.7em', float: 'right', marginRight: '20px', marginTop: '-20px' }} /> */}
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

