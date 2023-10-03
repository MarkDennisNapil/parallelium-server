const mongoose = require('mongoose');

const CoinsTransaction = new mongoose.Schema({
    sender: {
      type: String,
      required: true
    },
    receiver: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      default: 50
    },
    description: {
      type: String
    },
    date: {
      type: String,
      required: true
    }
  },
  {
    collection: 'coins_transactions'
  });
  const coins_transactions = new mongoose.model("coins_transactions", CoinsTransaction);
  module.exports = coins_transactions;
