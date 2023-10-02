const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  participants: {
    type: Array
  },
  sender_id: {
    type: String
  },
  receiver_id: {
    type: String
  },
  sender_email: {
    type: String
  },
  receiver_email: {
    type: String
  },
  message: {
    type: String
  },
  files: {
    type: Array

  },
  likes: {
    type: Array
  },
  dateCreated: {
    type: String
  },
  dateModified: {
    type: String
  }
},
{
  collection: 'message'
});

const message = mongoose.model("message", messageSchema);

module.exports = message;
