import React, { Component } from "react";
import {
    MDBContainer,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBAlert,
    MDBTable,
    MDBTableBody,
    MDBTableHead
  } from 'mdbreact';
import API from '../../utils/tournamentAPI';
import gameApi from "../../utils/gameAPI";

  class EditTournament extends Component {

    constructor(props) {
        super(props);

        const columns = [
          {
            label: '#',
            field: 'id',
            sort: 'asc'
          },
          {
            label: 'Name',
            field: 'name',
            sort: 'asc'
          },
          {
            label: 'Player Name',
            field: 'playerName',
            sort: 'asc'
          },
          {
            label: 'Status',
            field: 'status',
            sort: 'asc'
          },
          {
            label: 'Aprove/Decline',
            field: 'approval',
            sort: 'asc'
          },
        ];

        this.state = {
          name: '',
          game: '',
          address: '',
          venue: '',
          status: '',
          games: [],
          players: [],
          judges: [],
          tab: 'info',
          tabInfo: 'nav-link active',
          tabPlayers: 'nav-link',
          tabVolunteers: 'nav-link',
          infoMessage: '',
          statusButton: '',
          disable: true,
          editButton: 'Edit',
          playersRows: [],
          judgesRows: [],
          columns: columns
        };

        this.handleTabClick = this.handleTabClick.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.editTournamentInfo = this.editTournamentInfo.bind(this);
        this.onChange = this.onChange.bind(this);
        this.populatePlayersAndVolunteers = this.populatePlayersAndVolunteers.bind(this);
        this.approvePlayer = this.approvePlayer.bind(this);
        this.declinePlayer = this.declinePlayer.bind(this);
        this.approveJudge = this.approveJudge.bind(this);
        this.declineJudge = this.declineJudge.bind(this);
    }

    componentDidMount() {

      API.getTournament(this.props.match.params.id)
        .then(res => {
          this.setState({
            name: res.data.name,
            game: res.data.game.name,
            gameId: res.data.game._id,
            address: res.data.address,
            venue: res.data.venue,
            status: res.data.status,
            players: res.data.players,
            judges: res.data.judges
          });
          this.setInfoMessage();
          this.loadAllGames();
          this.populatePlayersAndVolunteers();
        }).catch(err => console.log(err));
    }

    populatePlayersAndVolunteers() {

      //get players registered for tournament
      let id = 1;
      let rows = [];
      this.state.players.map(player => {

        let approveButton = <MDBBtn color="blue" outline size="sm" key={`${player.user._id.toString()}-approve-player`} data_user_id={player.user._id.toString()} onClick={this.approvePlayer}>Approve</MDBBtn>;
        let declineButton = <MDBBtn color="blue" outline size="sm" key={`${player.user._id.toString()}-decline-player`} data_user_id={player.user._id.toString()} onClick={this.declinePlayer}>Decline</MDBBtn>;

        let row = {
          id: id,
          name: player.user.userName,
          playerName: player.user.playerName,
          status: player.status,
          approval:[]
        }

        if (player.status == 'pending'){
          row.approval.push(approveButton);
          row.approval.push(declineButton);
        }

        else {
          row.approval.push('Player has been ' + player.status);
        }

        rows.push(row);
        id = id + 1;

      });

      console.log(rows);

      this.setState({playersRows: rows});
      console.log(this.state.playersRows);

      //get volunteers registered for tournament
      id = 1;
      rows = [];
      this.state.judges.map(judge => {

        let approveButton = <MDBBtn color="blue" outline size="sm" key={`${judge.user._id.toString()}-approve-judge`} data_user_id={judge.user._id.toString()} onClick={this.approveJudge}>Approve</MDBBtn>;
        let declineButton = <MDBBtn color="blue" outline size="sm" key={`${judge.user._id.toString()}-decline-judge`} data_user_id={judge.user._id.toString()} onClick={this.declineJudge}>Decline</MDBBtn>;

        let row = {
          id: id,
          name: judge.user.userName,
          playerName: judge.user.playerName,
          status: judge.status,
          approval:[]
        }

        if (judge.status == 'pending'){
          row.approval.push(approveButton);
          row.approval.push(declineButton);
        }

        else {
          row.approval.push('Volunteer has been ' + judge.status);
        }

        rows.push(row);
        id = id + 1;
      });

      this.setState({judgesRows: rows});
    }

    loadAllGames() {

      gameApi.getGames()
        .then(res => {
          this.setState({ games: res.data });
        })
        .catch(err => console.log(err));
    }

    setInfoMessage() {

      if (this.state.status === 'new') {
        this.setState({
          infoMessage: 'Tournament has been created. Press open to make tournament open for public',
          statusButton:'Open'
        })
      }

      else if (this.state.status === 'open') {
        this.setState ({
          infoMessage: 'Tournament is open for registration and wating for approval of volunteers and players. Press close to close registration',
          statusButton: 'Close'
        })
      }

      else if (this.state.status === 'closed') {
        this.setState({
          infoMessage:'Tournament is closed for registration. Press start to make tournament live',
          statusButton: 'Start'
        })
      }

      else if (this.state.status === 'running') {
        this.setState({
          infoMessage: 'Tournament is live. Press end once is done',
          statusButton: 'End'
        })
      }

      else if (this.state.status === 'finished') {
        this.setState({
          infoMessage: 'Tournament has been completed. No other action require from your part',
          statusButton: ''
        })
      }
    }

    handleTabClick(event) {

      const id = event.target.id;
      this.setState({
        tab: id
      })

      if (id === 'info') {
        this.setState({
          tabInfo: 'nav-link active',
          tabPlayers: 'nav-link',
          tabVolunteers: 'nav-link',
        })

      } else if (id === 'players') {
        this.setState({
          tabInfo: 'nav-link',
          tabPlayers: 'nav-link active',
          tabVolunteers: 'nav-link',
        })

      } else if (id === 'volunteers') {
        this.setState({
          tabInfo: 'nav-link',
          tabPlayers: 'nav-link',
          tabVolunteers: 'nav-link active',
        })
      }
    }

    changeStatus () {

      let status = '';

      if (this.state.statusButton === 'Open')
        {status = 'open';}
      else if (this.state.statusButton === 'Close')
        {status = 'closed';}
      else if (this.state.statusButton === 'Start')
        {status = 'running';}
      else if (this.state.statusButton === 'End')
        {status = 'finsihed';}

      API.updateStatus(this.props.match.params.id, {status: status})
        .then (res => {
          this.setState({status: res.data.status, tab: 'info', tabInfo: 'nav-link active'});
          this.setInfoMessage();
        })
        .catch(err => console.log(err));
    }

    editTournamentInfo () {

      if (this.state.disable) {
        this.setState ({disable: false, editButton: 'Update'})
      }
      else {
        this.setState({disable: true, editButton: 'Edit'})
      }

      this.updateTournament();
    }

    updateTournament() {

      if (this.state.editButton == 'Update'){
        const data = {
          name: this.state.name,
          game: this.state.game,
          venue: this.state.venue,
          address: this.state.address
        }

        API.updateTournament(this.props.match.params.id, data)
          .then (res => {
            this.setState({
              name: res.data.name,
              game: res.data.game.name,
              gameId: res.data.game._id,
              address: res.data.address,
              venue: res.data.venue,
              status: res.data.status,
              players: res.data.players
            })
          })
          .catch(err => console.log(err));
      }
    }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };


    approvePlayer( event ) {
      const tournamentId = this.props.match.params.id;
      const userId = event.target.getAttribute( 'data_user_id' );
      const data = { user: userId , status: 'approved' };

      API.updatePlayerStatus( tournamentId , data )
      .then(
        ( response ) => {
          var responseTournament = response.data;
          this.setState( { players: responseTournament.players } );
          this.componentDidMount();
        }
      )
      .catch(
        ( error ) => console.log( error )
      );
    }


    declinePlayer( event ) {
      const tournamentId = this.props.match.params.id;
      const userId = event.target.getAttribute( 'data_user_id' );
      const data = { user: userId , status: 'declined' };

      API.updatePlayerStatus( tournamentId , data )
      .then(
        ( response ) => {
          var responseTournament = response.data;
          this.setState( { players: responseTournament.players } );
          this.componentDidMount();
        }
      )
      .catch(
        ( error ) => console.log( error )
      );
    }


    approveJudge( event ) {
      const tournamentId = this.props.match.params.id;
      const userId = event.target.getAttribute( 'data_user_id' );
      const data = { user: userId , status: 'approved' };

      API.updateJudgeStatus( tournamentId , data )
      .then(
        ( response ) => {
          var responseTournament = response.data;
          this.setState( { players: responseTournament.judges } );
          this.componentDidMount();
        }
      )
      .catch(
        ( error ) => console.log( error )
      );
    }


    declineJudge( event ) {
      const tournamentId = this.props.match.params.id;
      const userId = event.target.getAttribute( 'data_user_id' );
      const data = { user: userId , status: 'declined' };

      API.updateJudgeStatus( tournamentId , data )
      .then(
        ( response ) => {
          var responseTournament = response.data;
          this.setState( { players: responseTournament.judges } );
          this.componentDidMount();
        }
      )
      .catch(
        ( error ) => console.log( error )
      );
    }


    render () {
        return (
          <MDBContainer>
            <div style={{ margin: '20px' }}>
                <div style={{ margin: '30px' }}>
                    <div className="row">
                        <div className="col">
                        <h4>ORGANIZE</h4>
                        </div>
                    </div>

                    <div style={{ margin: "0 50px" }}>
                        <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={this.state.tabInfo} id="info" onClick={this.handleTabClick}>Tournament Info</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.state.tabPlayers} id="players" onClick={this.handleTabClick}>Players</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.state.tabVolunteers} id="volunteers" onClick={this.handleTabClick}>Volunteers</a>
                        </li>
                        </ul>

                        <div style={{ margin: "20px 50px" }}>
                          {this.state.tab === 'info' ?
                          <div>
                            <MDBAlert color="info" >
                              <MDBRow className="row">
                                <MDBCol className="col-10" style={{paddingTop: '10px'}}>
                                  {this.state.infoMessage}
                                </MDBCol>
                                <MDBCol className="col-2">
                                  <button className="btn btn-primary" onClick={this.changeStatus}>{this.state.statusButton}</button>
                                </MDBCol>
                              </MDBRow>
                            </MDBAlert>
                            <div className="form-group">
                            <MDBRow>
                              <MDBCol md="6">
                              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={this.state.name}
                                disabled={this.state.disable}
                                onChange={this.onChange}
                              />
                              </MDBCol>
                              <MDBCol md="6">
                                <label htmlFor="defaultFormContactNameEx" className="grey-text">
                                  Game
                                </label>
                                <select
                                  className="browser-default custom-select"
                                  id="game"
                                  onChange={this.onChange}
                                  disabled={this.state.disable}>

                                {this.state.games.length ? (
                                  this.state.games.map(game => (
                                  <option value={game._id}>{game.name}</option>
                                ))
                                ) : ("")}
                                </select>
                              </MDBCol>
                            </MDBRow>
                            <br />
                            <MDBRow>
                              <MDBCol md="6">
                              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                                Venue
                              </label>
                              <input
                                type="text"
                                id="venue"
                                className="form-control"
                                value={this.state.venue}
                                disabled={this.state.disable}
                                onChange={this.onChange}
                              />
                              </MDBCol>
                              <MDBCol md="6">
                              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                                Address
                              </label>
                              <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={this.state.address}
                                disabled={this.state.disable}
                                onChange={this.onChange}
                              />
                              </MDBCol>
                            </MDBRow>
                            <br />
                            <MDBRow>
                            <MDBCol md="3">
                              <button className="btn btn-primary" onClick={this.editTournamentInfo}>{this.state.editButton}</button>
                              </MDBCol>
                            </MDBRow>
                            </div>
                          </div>
                          :''}

                          {this.state.tab === 'players' ?
                          <MDBTable btn>
                            <MDBTableHead columns={this.state.columns} />
                            <MDBTableBody rows={this.state.playersRows} />
                          </MDBTable> : ''
                          }

                          {this.state.tab === 'volunteers' ?
                            <MDBTable btn>
                            <MDBTableHead columns={this.state.columns} />
                            <MDBTableBody rows={this.state.judgesRows} />
                          </MDBTable> : ''
                          }
                        </div>
                    </div>
                </div>
            </div>
          </MDBContainer>
        );
    }
  }

  export default EditTournament;
