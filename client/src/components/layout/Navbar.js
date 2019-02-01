import React, { Component } from "react";
import { connect } from "react-redux";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Navbar extends Component {
    render() {
        const { user } = this.props.auth;
        return (

            <SideNav
                onSelect={(selected) => {
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
            </NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Charts
            </NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Bar Chart
                </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>

        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Navbar);
