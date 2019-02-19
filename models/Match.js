const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatchSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    judge: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    player1: {

        isBye: {
            type: Boolean,
            required: true,
            default: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        score: {
            type: Number
        },
        isWinner: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    player2: {

        isBye: {
            type: Boolean,
            required: true,
            default: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        score: {
            type: Number
        },
        isWinner: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    status: {
        type: String,
        required: true,
        enum: [
            "new",
            "ready",
            "finished"
        ],
        default: "new"
    }
});

module.exports = Match = mongoose.model("Match", MatchSchema, "matches");
