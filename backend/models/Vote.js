const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true,
  },
  optionIndex: {
    type: Number,
    required: true, // Index of the option that was selected
  },
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Null if the vote is anonymous
  },
  ipAddress: {
    type: String,
    required: true, // Track IP to prevent multiple votes by the same user for anonymous voting
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vote', VoteSchema);
