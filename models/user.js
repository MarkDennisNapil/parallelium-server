const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Notification = new mongoose.Schema({
  sender: {
    type: String
  },
  category: {
    type: String
  },
  notification: {
    type: String
  },
  date: { type: Date, default: Date.now() },
  read: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String
  },
  photo: {
    type: String
  },
  birthdate: {
    type: String
  },
  role: {
    type: String
  },
  profession: {
    type: Array
  },
  email: {
    type: String,
    unique: [true, "Email already used!"],
  },
  verified: {
    type: Boolean,
    default: false
  },
  phone: {
    type: Number
  },
  password: {
    type: String,
  },
  coins: {
    type: Number,
    default: 0
  },
  followers: {
    type: Array
  },
  following: {
    type: Array
  },
  connections: {
    type: Array
  },
  notifications: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Notification' }],
  dateCreated: {
    type: String
  },
  dateModified: {
    type: String  
  }
},
  {
    collection: 'users'
  })
  
const users = mongoose.model("users", userSchema);
module.exports = users
