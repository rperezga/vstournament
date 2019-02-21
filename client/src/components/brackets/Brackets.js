import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import Match from '../match/Match';


class Brackets extends Component {
   constructor(props) {
      super(props);

      this.state = {
         matches: this.props.matches
      }
   }

   render() {
      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol>
                  {this.state.matches[0].status === 'new' ? <Match />
                     :
                     <Match
                        player1={this.state.matches[0].player1.isBye ? "isBye" : this.state.matches[0].player1.user.userName}
                        point1={this.state.matches[0].player1.isBye ? "" : this.state.matches[0].player1.score}
                        player2={this.state.matches[0].player2.isBye ? "isBye" : this.state.matches[0].player2.user.userName}
                        point2={this.state.matches[0].player2.isBye ? "" : this.state.matches[0].player2.score}
                     />
                  }
               </MDBCol>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol></MDBCol>
               <MDBCol>
                  {this.state.matches[4].status === 'new' ? ""
                     :
                     <Match
                        player1={this.state.matches[4].player1.user.userName}
                        point1={this.state.matches[4].player1.score}
                        player2={this.state.matches[4].player2.user.userName}
                        point2={this.state.matches[4].player2.score}
                     />
                  }
               </MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol>
                  <Match
                     player1={this.state.matches[1].player1.isBye ? "isBye" : this.state.matches[1].player1.user.userName}
                     point1={this.state.matches[1].player1.isBye ? "" : this.state.matches[1].player1.score}
                     player2={this.state.matches[1].player2.isBye ? "isBye" : this.state.matches[1].player2.user.userName}
                     point2={this.state.matches[1].player2.isBye ? "" : this.state.matches[1].player2.score}
                  />
               </MDBCol>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
               <MDBCol>
                  {this.state.matches[6].status === 'new' ? ""
                     :
                     <Match
                        player1={this.state.matches[6].player1.user.userName}
                        point1={this.state.matches[6].player1.score}
                        player2={this.state.matches[6].player2.user.userName}
                        point2={this.state.matches[6].player2.score}
                     />
                  }
               </MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol>
                  <Match
                     player1={this.state.matches[2].player1.isBye ? "isBye" : this.state.matches[2].player1.user.userName}
                     point1={this.state.matches[2].player1.isBye ? "" : this.state.matches[2].player1.score}
                     player2={this.state.matches[2].player2.isBye ? "isBye" : this.state.matches[2].player2.user.userName}
                     point2={this.state.matches[2].player2.isBye ? "" : this.state.matches[2].player2.score}
                  />
               </MDBCol>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol></MDBCol>
               <MDBCol>
                  {this.state.matches[5].status === 'new' ? ""
                     :
                     <Match
                        player1={this.state.matches[5].player1.user.userName}
                        point1={this.state.matches[5].player1.score}
                        player2={this.state.matches[5].player2.user.userName}
                        point2={this.state.matches[5].player2.score}
                     />
                  }
               </MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol>
                  <Match
                     player1={this.state.matches[3].player1.isBye ? "isBye" : this.state.matches[3].player1.user.userName}
                     point1={this.state.matches[3].player1.isBye ? "" : this.state.matches[3].player1.score}
                     player2={this.state.matches[3].player2.isBye ? "isBye" : this.state.matches[3].player2.user.userName}
                     point2={this.state.matches[3].player2.isBye ? "" : this.state.matches[3].player2.score}
                  />
               </MDBCol>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default Brackets;