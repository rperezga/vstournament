const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

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
});

module.exports = User = mongoose.model("matches", UserSchema);