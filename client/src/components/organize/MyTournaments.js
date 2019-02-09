import React, { Component } from "react";
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

class CardTournament extends Component {
    render() {
        return (
            <li className="list-group-item" style={{ marginBottom: "15px" }}>
                <div className="row">
                    <div className="col-3">
                        <img src={this.props.thumbnail || "https://placehold.it/200x100"} style={{ width: "100%" }} />
                    </div>
                    <div className="col-7">
                        <h3>{this.props.name}</h3>
                        <h4>Game: {this.props.game}</h4>
                        <h4>Date: <Moment format=" YYYY/MM/DD HH:mm">
                            {this.props.date}
                        </Moment></h4>
                    </div>
                    <div className="col-2" style={{textAlign: "center"}}>
                    <button className="btn btn-primary" id="savebtn" dataid="{props.index}" onClick="{props.saveArticle}">Edit</button>
                    </div>
                </div>
            </li>
        );
    }
}

export default CardTournament;
