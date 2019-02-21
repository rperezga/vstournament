import axios from "axios";

export default {
    // Gets all tournaments
    getTournaments: function () {
        return axios.get("/api/tournaments");
    },

    getUser: function (id) {
        return axios.get("/api/users/find/" + id);
    },

    // Saves a tournament to the database
    saveTournament: function (data) {
        return axios.post("/api/tournaments", data);
    },

    // Gets the tournament with the given id
    getTournament: function (id) {
        return axios.get("/api/tournaments/" + id);
    },

    // Deletes the tournament with the given id
    deleteTournament: function (id) {
        return axios.delete("/api/tournaments/" + id);
    },

    //updates a tournament to the database
    updateTournament: function (id, data) {
        return axios.put("/api/tournaments/" + id, data);
    },

    getUserTournaments: function (id) {
        return axios.get("/api/tournaments/byuser/" + id)
    },

    getJudgeTournaments: function (id) {
        return axios.get("/api/tournaments/judge/" + id)
    },

    getPlayerTournaments: function (id) {
        return axios.get("/api/tournaments/player/" + id)
    },

    getGame: function (id) {
        return axios.get("/api/games/" + id)
    },

    //Subscribe as Volunteer
    subsVolunteer: function (id, data) {
        return axios.put("/api/tournaments/subsvolunteer/" + id, data);
    },

    //Subscribe as Player
    subsPlayer: function (id, data) {
        return axios.put("/api/tournaments/subsplayer/" + id, data);
    },

    updateStatus: function (id, data) {
        return axios.put("/api/tournaments/status/" + id, data);
    },

    // update player status
    updatePlayerStatus: function (id, data) {
        return axios.put(`/api/tournaments/updatePlayerStatus/${id}`, data);
    },

    // update judge status
    updateJudgeStatus: function (id, data) {
        return axios.put(`/api/tournaments/updateJudgeStatus/${id}`, data);
    },

    // generate brackets
    generateBrackets: function( id ) {
        return axios.put( `/api/tournaments/generateBrackets/${id}` );
    } ,

    // advance players to next match
    advancePlayers: function( id , data ) {
        return axios.put( `/api/tournaments/advancePlayers/${id}` , data );
    } ,

    // create result notification
    createResultNotification: function( id , data ) {
        return axios.put( `/api/tournaments/createResultNotification/${id}` , data );
    } ,

    // create commentary notification
    createCommentaryNotification: function( id , data ) {
        return axios.put( `/api/tournaments/createCommentaryNotification/${id}` , data );
    }

};
