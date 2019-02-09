import React, { Component } from "react";

class VolunteerCard extends Component {
    render() {
        return (
            <React.Fragment>
                <li className="list-group-item" style={{ marginBottom: "15px" }}>
                <div className="row">
                    <div className="col-3">
                        <img src={this.props.thumbnail || "https://placehold.it/200x100"} style={{ width: "100%" }} />
                    </div>
                    <div className="col-7">
                       <h3>{this.props.name}</h3>
                       <h4>Game: {this.props.game}</h4>
                   </div>
                    <div className="col-2" style={{textAlign: "center"}}>
                    <button className="btn btn-primary" id="savebtn" dataid="{props.index}" onClick="{props.saveArticle}">Edit</button>
                    </div>
                </div>
            </li>
            </React.Fragment>
        );
    }
}

export default VolunteerCard;
