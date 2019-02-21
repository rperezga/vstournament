import axios from "axios";

export default {
    // Gets all notifications
    getTournaments: function () {
        return axios.get("/api/notifications");
    },

    // Saves a notification to the database
    saveTournament: function (data) {
        return axios.post("/api/notifications", data);
    },

    // Gets the notification with the given id
    getTournament: function (id) {
        return axios.get("/api/notifications" + id);
    },

    // Deletes the notification with the given id
    deleteTournament: function (id) {
        return axios.delete("/api/notifications" + id);
    },

    //updates a notification to the database
    updateTournament: function (id, data) {
        return axios.put("/api/notifications" + id, data);
    }
};