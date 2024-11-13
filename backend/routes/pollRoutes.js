const express = require('express');
const { createPoll, getPolls, votePoll, deletePoll, updatePoll } = require('../controllers/pollController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/', authenticate, createPoll);  // Create a new poll
router.get('/', getPolls);     // Get all polls
router.post('/:id/vote', authenticate , votePoll);  // Vote on a poll
router.delete('/:id', authenticate, deletePoll);   // Delete a poll
router.put('/:id', authenticate , updatePoll);      // Update a poll

module.exports = router;
