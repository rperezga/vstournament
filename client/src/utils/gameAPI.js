import axios from "axios";

export default {
  // Gets all games
  getTournaments: function() {
      return axios.get("/api/games");
  },
  // Saves a game to the database
  saveTournament: function(data) {
      return axios.post("/api/games", data);
  },
  // Gets the game with the given id
  getTournament: function(id) {
      return axios.get("/api/games" + id);
  },
  // Deletes the game with the given id
  deleteTournament: function(id) {
      return axios.delete("/api/games" + id);
  },
  //updates a game to the database
  updateTournament: function (id, data) {
      return axios.put("/api/games" + id, data);
  }
};