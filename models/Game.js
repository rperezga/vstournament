const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GameSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    gameDuration: {
        type: String,
        required: true
    },

});

module.exports = Game = mongoose.model("Game", GameSchema, "games");