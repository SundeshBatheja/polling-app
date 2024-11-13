// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const pollRoutes = require('./pollRoutes');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/polls', pollRoutes);

module.exports = router;
