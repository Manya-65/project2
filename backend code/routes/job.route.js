const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createJob, getJobs, applyJob } = require('../controllers/jobController');

// GET all jobs with filters
router.get('/', getJobs);

// POST a new job (employer only)
router.post('/', auth, createJob);

// Apply for job
router.post('/:id/apply', auth, applyJob);

module.exports = router;