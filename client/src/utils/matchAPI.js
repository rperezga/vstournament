import axios from "axios";

export default {
    // Gets all matches
    getMatchs: function () {
        return axios.get("/api/matches");
    },

    // Saves a match to the database
    saveMatch: function (data) {
        return axios.post("/api/matches", data);
    },

    // Gets the match with the given id
    getMatch: function (id) {
        return axios.get("/api/matches/" + id);
    },

    // Deletes the match with the given id
    deleteMatch: function (id) {
        return axios.delete("/api/matches/" + id);
    },

    //updates a match to the database
    updateMatch: function (id, data) {
        console.log('before axios');
        return axios.put("/api/matches/" + id, data);
    }
};