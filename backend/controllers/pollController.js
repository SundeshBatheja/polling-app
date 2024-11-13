const Poll = require('../models/Poll');
const { io } = require('../app');  // Export 'io' from server for real-time

exports.createPoll = async (req, res) => {
  try {
    const { question, options, image } = req.body;
    if (options.length < 2 || options.length > 5) {
      return res.status(400).json({ error: 'Poll must have 2-5 options' });
    }
    const poll = await Poll.create({
      creator: req.user.userId,
      question,
      options: options.map(option => ({ optionText: option, votes: 0 })),
      image,
    });
    res.status(201).json(poll);
  } catch (error) {
    console.error("Error creating poll:", error); // Log the error
    res.status(500).json({ error: 'Failed to create poll' });
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve polls' });
  }
};

exports.votePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionIndex } = req.body;
    const poll = await Poll.findById(id);
    if (!poll || optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Invalid poll or option' });
    }
    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;
    await poll.save();

    // Emit updated poll data to connected clients
    io.emit('pollUpdated', poll);
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cast vote' });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    await Poll.findByIdAndDelete(req.params.id);
    res.json({ message: 'Poll deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete poll' });
  }
};

exports.updatePoll = async (req, res) => {
  try {
    const updatedPoll = await Poll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPoll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update poll' });
  }
};
