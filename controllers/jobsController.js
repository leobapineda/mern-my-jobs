import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequest,
  Unauthenticated,
  NotFound,
  Forbidden,
} from "../errors/index.js";

const createJob = async (req, res) => {
  const { position, company } = req.body;
  
  if ( !position || !company) {
    throw new BadRequest("Please provide all values");
  }

  if (position.length > 50)  {
    throw new BadRequest(
      "Position is longer than the maximum allowed length (50)"
    );
  }

  if (company.length > 50) {
    throw new BadRequest(
      "Company is longer than the maximum allowed length (50)"
    );
  }
  
  req.body.createdBy = req.user.userID;
  const job = await jobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: "job created", job });
};

const getAllJobs = async (req, res) => {
  const jobs = await jobModel.find({ createdBy: req.user.userID });
  
    res
      .status(StatusCodes.OK)
      .json({ totalJobs: jobs.length,  numOfPages: 1 , jobs});
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
  const deleteAll = await jobModel.deleteMany();
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