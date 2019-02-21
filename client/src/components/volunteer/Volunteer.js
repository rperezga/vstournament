import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/tournamentAPI";
import APIMatch from "../../utils/matchAPI";
import VolunteerCard from './VolunteerCard';

import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import InputMatch from '../inputMatch/InputMatch';

class Volunteer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'pending',
      tabJudge: 'nav-link active',
      tabUpcoming: 'nav-link',
      tabFinished: 'nav-link',
      tabPending: 'nav-link',
      tabRejected: 'nav-link',
      tournaments: [],
      match: {} ,
      modal: false ,
      modalTournamentId: undefined ,
      modalBracketId: undefined ,
      modalMatchId: undefined ,
      modalMatch: undefined
    }

    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.loadTournaments();

    /*
    this.match = '5c5fb700ef4c2897efa5e501'
    APIMatch.getMatch(this.match)
      .then(res => {
        this.setState({ match: res.data });
        // console.log(this.state.match)
      }
      )
      .catch(err => console.log(err));
    */
  }


  openModal( tournamentId , bracketId , matchId , match ) {
    // console.group( 'Volunteer.openModal()' );
    // console.log( 'tournamentId:' , tournamentId );
    // console.log( 'bracketId:' , bracketId );
    // console.log( 'matchId:' , matchId );
    // console.log( 'match:' , match );

    this.setState(
      {
        modal: !this.state.modal ,
        modalTournamentId: tournamentId ,
        modalBracketId: bracketId ,
        modalMatchId: matchId ,
        modalMatch: match
      }
    );

    // console.groupEnd();
  }


  closeModal() {
    this.loadTournaments();
    this.setState( { modal: !this.state.modal } );
  }


  loadTournaments() {
    API.getJudgeTournaments(this.props.auth.user.id)
      .then(res => {
        this.setState({ tournaments: res.data });
        // console.log(this.state.tournaments)
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
                <a className={this.state.tabJudge} id="judge" onClick={this.handleClick}>Live Tournaments</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabUpcoming} id="upcoming" onClick={this.handleClick}>Upcoming Tournaments</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabFinished} id="finished" onClick={this.handleClick}>Finished Tournaments</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabPending} id="pending" onClick={this.handleClick}>Pending Applications</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabRejected} id="rejected" onClick={this.handleClick}>Rejected Applications</a>
              </li>
            </ul>
          </div>

          <div style={{ margin: "20px 50px" }}>
            <h1>

              {
                (
                  // return tournaments in active tab
                  this.state.tournaments.filter(
                    ( tournament ) => {
                      // find judge in tournament
                      let tournamentJudge = tournament.judges.find(
                        ( judge ) => ( judge.user === this.props.auth.user.id )
                      );
                      return (
                        ( ( this.state.tab === 'judge' ) && ( tournamentJudge.status === 'approved' ) && ( tournament.status === 'running' ) ) ||
                        ( ( this.state.tab === 'upcoming' ) && ( tournamentJudge.status === 'approved' ) && ( tournament.status === 'new' ) ) ||
                        ( ( this.state.tab === 'upcoming' ) && ( tournamentJudge.status === 'approved' ) && ( tournament.status === 'open' ) ) ||
                        ( ( this.state.tab === 'upcoming' ) && ( tournamentJudge.status === 'approved' ) && ( tournament.status === 'closed' ) ) ||
                        ( ( this.state.tab === 'upcoming' ) && ( tournamentJudge.status === 'approved' ) && ( tournament.status === 'ready' ) ) ||
                        ( ( this.state.tab === 'finished' ) && ( tournamentJudge.status === 'approved' ) && ( tournament.status === 'finished' ) ) ||
                        ( ( this.state.tab === 'pending' ) && ( tournament.status === 'pending' ) ) ||
                        ( ( this.state.tab === 'rejected' ) && ( tournamentJudge.status === 'rejected' ) )
                      )
                    }
                  )
                  .map(
                    ( tournament , tournamentIndex ) => {
                      // console.log( '[Volunteer.render()] tournamentIndex' , tournamentIndex );
                      // console.log( '[Volunteer.render()] tournament._id' , tournament._id );
                      // console.log( '[Volunteer.render()] tournament.name' , tournament.name );
                      return (
                        <React.Fragment key={`tournament-${tournament._id}-ReactFragment`}>
                          <VolunteerCard  id={`tournament-${tournament._id}-VolunteerCard`} tournament={tournament} userid={this.props.auth.user.id} openmodal={this.openModal} />
                        </React.Fragment>
                      )
                    }
                  )
                )
              }

            </h1>
          </div>
        </div>


        <MDBModal isOpen={this.state.modal} toggle={this.closeModal}>
          <MDBModalHeader toggle={this.closeModal}>Match Edit</MDBModalHeader>
          <MDBModalBody>
            <InputMatch
              tournamentid={this.state.modalTournamentId}
              bracketid={this.state.modalBracketId}
              matchid={this.state.modalMatchId}
              match={this.state.modalMatch}
              closemodal={this.closeModal}
            />
          </MDBModalBody>
        </MDBModal>


      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Volunteer);
