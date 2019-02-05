import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  tournamentCreate: function(tournamentData) {
    return axios.post("/api/tournaments", tournamentData);    
  }

};



