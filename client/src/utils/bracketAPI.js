import axios from "axios";

export default {
    // Gets all brackets
    getTournaments: function () {
        return axios.get("/api/brackets");
    },

    // Saves a bracket to the database
    saveTournament: function (data) {
        return axios.post("/api/brackets", data);
    },

    // Gets the bracket with the given id
    getTournament: function (id) {
        return axios.get("/api/brackets" + id);
    },

    // Deletes the bracket with the given id
    deleteTournament: function (id) {
        return axios.delete("/api/brackets" + id);
    },

    //updates a bracket to the database
    updateTournament: function (id, data) {
        return axios.put("/api/brackets" + id, data);
    }
};