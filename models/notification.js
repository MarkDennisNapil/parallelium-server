const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: String
    },
    content: {
        type: Array
    }
})