import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/tournamentAPI";
import APIMatch from "../../utils/matchAPI";
import VolunteerCard from './VolunteerCard';
import { element } from "prop-types";

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import Brackets from '../brackets/Brackets';
import InputMatch from '../inputMatch/InputMatch';
class Volunteer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'pending',
      tabPending: 'nav-link active',
      tabJudge: 'nav-link',
      tabUpcoming: 'nav-link',
      tabFinished: 'nav-link',
      tabRejected: 'nav-link',
      tournaments: [],
      modal: false,
      match: {}
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.loadTournaments();

    this.match = '5c5fb700ef4c2897efa5e501'
    APIMatch.getMatch(this.match)
      .then(res => {
        this.setState({ match: res.data });
        console.log(this.state.match)
      }
      )
      .catch(err => console.log(err));
  }

  toggle() {
    console.log("CClicked")
    this.setState({
      modal: !this.state.modal
    });
    this.player1 = this.state.match.player1.user.name
    this.p1id = this.state.match.player1.user._id
    this.player2 = this.state.match.player2.user.name
    this.p2id = this.state.match.player2.user._id
    this.matchid = this.match
  }

  loadTournaments = () => {
    API.getJudgeTournaments(this.props.auth.user.id)
      .then(res => {
        this.setState({ tournaments: res.data });
        console.log(this.state.tournaments)
      }
      )
      .catch(err => console.log(err));
  };

  handleClick(event) {
    const id = event.target.id;
    this.setState({
      tab: id
    })
    if (id === 'pending') {
      this.setState({
        tabPending: 'nav-link active',
        tabJudge: 'nav-link',
        tabUpcoming: 'nav-link',
        tabFinished: 'nav-link',
        tabRejected: 'nav-link',

      })
    } else if (id === 'judge') {
      this.setState({
        tabPending: 'nav-link',
        tabJudge: 'nav-link active',
        tabUpcoming: 'nav-link',
        tabFinished: 'nav-link',
        tabRejected: 'nav-link',
      })
    } else if (id === 'upcoming') {
      this.setState({
        tabPending: 'nav-link',
        tabJudge: 'nav-link',
        tabUpcoming: 'nav-link active',
        tabFinished: 'nav-link',
        tabRejected: 'nav-link',
      })
    } else if (id === 'finished') {
      this.setState({
        tabPending: 'nav-link',
        tabJudge: 'nav-link',
        tabUpcoming: 'nav-link',
        tabFinished: 'nav-link active',
        tabRejected: 'nav-link',
      })
    } else {
      this.setState({
        tabPending: 'nav-link',
        tabJudge: 'nav-link',
        tabUpcoming: 'nav-link',
        tabFinished: 'nav-link',
        tabRejected: 'nav-link active',
      })
    }
  }

  render() {
    return (
      <div style={{ margin: '20px' }}>

        <div style={{ margin: '30px' }}>
          <h4>VOLUNTEER</h4>

          <div style={{ margin: "0 50px" }}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className={this.state.tabPending} id="pending" onClick={this.handleClick} >Pending Applications</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabJudge} id="judge" onClick={this.handleClick}>Running Tournament</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabFinished} id="finished" onClick={this.handleClick}>Closed Tournament</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabUpcoming} id="upcoming" onClick={this.handleClick}>New Tournament</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabRejected} id="rejected" onClick={this.handleClick}>Rejected Applications</a>
              </li>
            </ul>
          </div>

          <div style={{ margin: "20px 50px" }}>
            <h1>

              {this.state.tournaments.map((tournament, index) => {
                const result = tournament.judges.find(judge => judge.user === this.props.auth.user.id);

                if (this.state.tab === 'pending' && result.status === 'pending') {
                  return (
                    <div>
                      <VolunteerCard
                        name={tournament.name}
                        game={tournament.game._id}
                      />
                    </div>
                  )
                } else if (result.status === 'approved') {
                  if (this.state.tab === 'judge' && tournament.status === 'running') {
                    var value = '';
                    let matches = [];
                    let matchName = [];
                    let matchId = [];
                    let a = tournament.brackets;
                    a.map((element) => {
                      let ajudges = element.judges.find(judge => judge === this.props.auth.user.id)
                      if (ajudges) {
                        console.log(` adjujes: ${ajudges}`)
                        value = element.name;
                        console.log(`Value :${value}`)
                        
                        matches = element.matches;
                        matches.map((element) => {
                         
                            matchName.push(element.name);
                            matchId.push(element._id);
                   
                        })
                        
                      }
                    })
                    return (
                      <React.Fragment>
                        <VolunteerCard
                          name={tournament.name}
                          game={tournament.game._id}
                          brackets={value}
                          matchName={matchName}
                          matchId={matchId}
                          toggle={this.toggle}
                        />

                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                          <MDBModalHeader toggle={this.toggle}>Match Edit</MDBModalHeader>
                          <MDBModalBody>
                            {/* id: player1, id: player2, id: match */}
                            <InputMatch toggle={this.toggle.bind(this)} player1={this.player1} player2={this.player2} p1id={this.p1id} p2id={this.p2id} matchid={this.matchid} />
                          </MDBModalBody>
                        </MDBModal>
                      </React.Fragment>

                    )
                  } else if (this.state.tab === 'finished' && tournament.status === 'closed') {
                    return (
                      <VolunteerCard
                        name={tournament.name}
                        game={tournament.game._id}
                      />
                    )
                  } else if (this.state.tab === 'upcoming' && tournament.status === 'new') {
                    return (
                      <VolunteerCard
                        name={tournament.name}
                        game={tournament.game._id}
                      />
                    )
                  }
                }
                else if (this.state.tab === 'rejected' && result.status === 'rejected') {
                  return (
                    <VolunteerCard
                      name={tournament.name}
                      game={tournament.game._id}
                    />
                  )
                }
              })

              }

            </h1>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Volunteer);
