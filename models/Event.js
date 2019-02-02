const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    organizer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    tournaments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tournament"
        }
    ]
});

module.exports = Event = mongoose.model("events", UserSchema);