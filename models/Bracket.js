const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BracketSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    /*
    date: {
        type: Date,
        required: true
    },
    */

    players: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],

    judges: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],

    matches: [
        {
            type: Schema.Types.ObjectId,
            ref: "Match",
            required: true
        }
    ],

    // the possible values are new, running, finished
    status: {
        type: String,
        required: true,
        enum: [
            "new",
            "running",
            "finished"
        ],
        default: 'new'
    }

});

module.exports = Bracket = mongoose.model("Bracket", BracketSchema, "brackets" );
