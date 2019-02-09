import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/tournamentAPI";
import VolunteerCard from './VolunteerCard';

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
      tournaments: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.loadTournaments();
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
                <a className={this.state.tabJudge} id="judge" onClick={this.handleClick}>Judge Bracket</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabUpcoming} id="upcoming" onClick={this.handleClick}>Upcoming Tournaments</a>
              </li>
              <li className="nav-item">
                <a className={this.state.tabFinished} id="finished" onClick={this.handleClick}>Finished Tournaments</a>
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
                    <VolunteerCard
                      name={tournament.name}
                      game={tournament.game.name}
                    />
                  )
                } else if (result.status === 'approved') {
                  if (this.state.tab === 'judge' && tournament.status === 'running') {
                    return (
                      <VolunteerCard
                        name={tournament.name}
                        game={tournament.game.name}
                      />
                    )
                  } else if (this.state.tab === 'finished' && tournament.status === 'closed') {
                    return (
                      <VolunteerCard
                        name={tournament.name}
                        game={tournament.game.name}
                      />
                    )
                  } else if (this.state.tab === 'upcoming' && tournament.status === 'new') {
                    return (
                      <VolunteerCard
                        name={tournament.name}
                        game={tournament.game.name}
                      />
                    )
                  }
                }
                else if (this.state.tab === 'rejected' && result.status === 'rejected') {
                  return (
                    <VolunteerCard
                      name={tournament.name}
                      game={tournament.game.name}
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
