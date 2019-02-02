import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          startDate: ""
        };
        this.handleChange = this.handleChange.bind(this);
      }
     
      handleChange(date) {
        this.setState({
          startDate: date
        });
      }
        
    render() {

        const { user } = this.props.auth;
        console.log(user);

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form action="/api/events/test" method="post"> 
                            <p className="h5 text-center mb-4">Sign up</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Name"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Location"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Address"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                 <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    showDisabledMonthNavigation
                                    placeholderText="Click to select a date and time"
                                />
                            </div>
                            <div className="text-center">
                                <MDBBtn type="submit" color="primary">Create</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,)(CreateEvent);