const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

  username: {
    type: String,
    required: true
  },

  playerName: {
    type: String,
    required: true
  },

  team: {
    type: String,
    required: true
  },

  regiion: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
