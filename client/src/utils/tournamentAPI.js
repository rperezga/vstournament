import axios from "axios";

export default {
  // Gets all tournaments
  getTournaments: function() {
    return axios.get("/api/tournaments");
  },
  //get user by id
  getUser: function (id) {
    return axios.get("/api/users/find/" + id);
  },
  // Saves a tournament to the database
  saveTournament: function(data) {
      return axios.post("/api/tournaments", data);
  },
  // Gets the tournament with the given id
  getTournament: function(id) {
    return axios.get("/api/tournaments/" + id);
  },
  // Deletes the tournament with the given id
  deleteTournament: function(id) {
    return axios.delete("/api/tournaments" + id);
  },
  //updates a tournament to the database
  updateTournament: function (id, data) {
    return axios.put("/api/tournaments" + id, data);
  },
  //get tournaments of user by id
  getUserTournaments: function (id) {
    return axios.get("/api/tournaments/byuser/" + id)
  },
  getJudgeTournaments: function (id) {
    return axios.get("/api/tournaments/judge/" + id)
    } 


};