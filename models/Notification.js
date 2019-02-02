const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NotificationShema = new Schema({ 

    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    notificationType: {
        type: String,
        required: true
    },

    bracket: {
        type: Schema.Types.ObjectId,
        ref: "Bracket"
    },

    tournament: {
        type: Schema.Types.ObjectId,
        ref: "Tournament"
    },

    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    }
});

module.exports = Notification = mongoose.model("notifications", NotificationShema);