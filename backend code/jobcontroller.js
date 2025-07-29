const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, employer: req.user.id });
  res.status(201).json(job);
};

exports.getJobs = async (req, res) => {
  const { keyword, location } = req.query;
  const jobs = await Job.find({
    title: { $regex: keyword || '', $options: 'i' },
    location: { $regex: location || '', $options: 'i' },
  });
  res.json(jobs);
};

exports.applyJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  job.applicants.push(req.user.id);
  await job.save();
  res.send('Applied successfully');
};