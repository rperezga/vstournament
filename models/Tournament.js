const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TournamentSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    game: {
        type: Schema.Types.ObjectId,
        ref: "Game"
    },

    date: {
        type: Date,
        default: Date.now
    },

    brackets: [
        {
            type: Schema.Types.ObjectId,
            ref: "Bracket"
        }
    ],

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

    result: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            position: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = Tournament = mongoose.model("tournaments", TournamentSchema);