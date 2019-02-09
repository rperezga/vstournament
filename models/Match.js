const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatchSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    player1: {

        player: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        score: {
            type: Number,
            required: false
        },
        isWinner: {
            type: Boolean,
            required: false
        }
    },

    player2: {

        player: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        score: {
            type: Number,
            required: false
        },
        isWinner: {
            type: Boolean,
            required: false
        }
    },

    // the possible values are new, running, finsihed
    status: {
        type: String,
        required: true
    }
});

module.exports = Match = mongoose.model("Match", MatchSchema, "matches");