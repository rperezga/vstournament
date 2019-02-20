const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NotificationShema = new Schema({

    notificationType: {
        type: String,
        // required: true,
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

    message: [
        {
            type: String,
            required: true
        }
    ]

});

module.exports = Notification = mongoose.model("Notification", NotificationShema, "notifications");
