const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BracketSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    players: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    judges: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    matches: [
        {
            type: Schema.Types.ObjectId,
            ref: "Match"
        }
    ],

    // the possible values are new, running, finished
    status: {
        type: String,
        required: true
    }

});

module.exports = Bracket = mongoose.model("Bracket", BracketSchema, "brackets");