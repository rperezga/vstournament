const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    gameDuration: {
        type: String,
        required: true
    },

});


module.exports = Game = mongoose.model("games", UserSchema);