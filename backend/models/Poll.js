const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  image: {
    originalUrl: { type: String }, // URL of the uploaded image before optimization
    optimizedUrl: { type: String }, // URL of the image after optimization
    originalSize: { type: Number }, // Original size in KB or MB
    optimizedSize: { type: Number }, // Optimized size in KB or MB
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Poll', PollSchema);
