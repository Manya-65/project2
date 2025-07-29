const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, employer: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { keyword = '', location = '' } = req.query;
    const jobs = await Job.find({
      title: { $regex: keyword, $options: 'i' },
      location: { $regex: location, $options: 'i' }
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send('Job not found');

    if (job.applicants.includes(req.user.id)) {
      return res.status(400).send('You already applied');
    }
 job.applicants.push(req.user.id);
    await job.save();
    res.send('Applied successfully');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
