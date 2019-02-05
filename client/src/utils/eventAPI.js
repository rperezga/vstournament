import axios from "axios";

export default {
  // Gets all event
  getTournaments: function() {
      return axios.get("/api/events");
  },
  // Saves a event to the database
  saveTournament: function(data) {
      return axios.post("/api/events", data);
  },
  // Gets the event with the given id
  getTournament: function(id) {
      return axios.get("/api/events" + id);
  },
  // Deletes the event with the given id
  deleteTournament: function(id) {
      return axios.delete("/api/events" + id);
  },
  //updates a event to the database
  updateTournament: function (id, data) {
      return axios.put("/api/events" + id, data);
  }
};