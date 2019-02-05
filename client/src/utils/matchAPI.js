import axios from "axios";

export default {
  // Gets all matches
  getTournaments: function() {
      return axios.get("/api/matches");
  },
  // Saves a match to the database
  saveTournament: function(data) {
      return axios.post("/api/matches", data);
  },
  // Gets the match with the given id
  getTournament: function(id) {
      return axios.get("/api/matches" + id);
  },
  // Deletes the match with the given id
  deleteTournament: function(id) {
      return axios.delete("/api/matches" + id);
  },
  //updates a match to the database
  updateTournament: function (id, data) {
      return axios.put("/api/matches" + id, data);
  }
};