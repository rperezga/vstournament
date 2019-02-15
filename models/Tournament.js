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
        ref: "Game",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    date: {
        type: Date,
        required: true
    },

    brackets: [
        {
            type: Schema.Types.ObjectId,
            ref: "Bracket"
        }
    ],

    players: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },

            //pending, approved, declined
            status: {
                type: String,
            }
        }
    ],

    judges: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },

            //pending, approved, declined
            status: {
                type: String,
            }
        }
    ],

    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: "Notification"
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
            }
        }
    ],

    status: {
        type: String,
        required: true,
        default: "new",
        enum: [
            "new",    /* Organizer just created the tournament; only organizer can see under "Organize" */
            "open",    /* Tournament is open to registration, becomes visible in "Tournaments". Players can register and volunteers can apply */
            "closed",    /* Tournament registration is closed */
            "running",    /* Tournmanent is live */
            "finished"    /* Tournmanet is completed */
        ]
    },

    organizer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    venue: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    channel: {
        type: String,
        required: true
    },
});

module.exports = Tournament = mongoose.model("Tournament", TournamentSchema, "tournaments");