import axios from "axios";

export default {
  //updates a game to the database
  updateUser: function (id, data) {
    return axios.put("/api/users/" + id, data);
  }
};