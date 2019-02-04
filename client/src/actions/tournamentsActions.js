import axios from "axios";

export const tournamentCreate = (tournamentData) => {
    axios
      .post("/api/tournaments/create", tournamentData)
      .then(res => console.log('Tournament created!'))
      .catch(err =>
        console.log(err)
      );
  };