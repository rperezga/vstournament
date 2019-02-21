const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NotificationShema = new Schema({

    notificationType: {
        type: String,
        required: true,
        enum: [
            'result',
            'advances',
            'eliminated',
            'commentary'
        ]
    },

    date: {
        type: Date,
        default: Date.now
    },

    tournament: {
        type: Schema.Types.ObjectId,
        ref: "Tournament"
    },

    bracket: {
        type: Schema.Types.ObjectId,
        ref: "Bracket"
    },

    match: {
        type: Schema.Types.ObjectId,
        ref: "Match"
    },

    message: {
        type: String,
        required: true
    }

});

module.exports = Notification = mongoose.model("Notification", NotificationShema, "notifications");
