const express = require('express');
const auth = require('../middleware/auth');
const { createJob, getJobs, applyJob } = require('../controllers/jobController');
const router = express.Router();

router.post('/', auth, createJob);
router.get('/', getJobs);
router.post('/:id/apply', auth, applyJob);

module.exports = router;