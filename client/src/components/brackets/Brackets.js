import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdbreact';
import Match from '../match/Match';


class Brackets extends Component {
   constructor(props) {
      super(props);

      this.state = {
         matches: [],
      }
   }

   render() {
      return (
         <MDBContainer>
            <MDBRow>
               <MDBCol><Match player1="Ichigo" point1="10" point2="12" win='2' player2="Aizen" /></MDBCol>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol></MDBCol>
               <MDBCol><Match /></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol><Match /></MDBCol>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
               <MDBCol><Match /></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol><Match /></MDBCol>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol></MDBCol>
               <MDBCol><Match /></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
            <MDBRow>
               <MDBCol><Match /></MDBCol>
               <MDBCol></MDBCol>
               <MDBCol></MDBCol>
            </MDBRow>
         </MDBContainer>
      );
   }
}

export default Brackets;