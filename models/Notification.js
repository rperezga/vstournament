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
});

module.exports = Notification = mongoose.model("notifications", NotificationShema);