import jobModel from "../models/jobModel.js";


const createJob = async (req, res) => {
  const {title, position} = req.body
  const userId = req.user.userID;
  const job = await jobModel.create({title, position, author:userId});
  res.status(200).json({ message: "job created", job });

};

const getAllJobs = async (req, res) => {
  const userId = req.user.userID;

const jobs = await jobModel.find({ author: userId });
  

  res.status(200).json({ Count: jobs.length, jobs });

  // populate

};

const updateJob = async (req, res) => {
  res.status(200).send("updateJob");
};

const deleteJob = async (req, res) => {
  res.status(200).send("deleteJob");
};

const showStats = async (req, res) => {
  res.status(200).send("showStats");
};


const deleteAllJobs = async (req, res) => {
  const deleteAll = await jobModel.deleteMany()
  res.status(200).json({ deleteAll });
};

export {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  deleteAllJobs,
};

// poder crear jobs
  // id de la persona que lo crea
  // titulo, posicion, company, state