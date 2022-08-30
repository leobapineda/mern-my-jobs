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

  if (!position || !company) {
    throw new BadRequest("Please provide all values");
  }

  if (position.length > 50) {
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
    .json({ totalJobs: jobs.length, numOfPages: 1, jobs });
};

const updateJob = async (req, res) => {
  const { userID } = req.user;
  const jobId = req.params.id;
  //  la info que necesito editar
  const { company, position, jobLocation } = req.body;




  if (
    company.trim() === "" ||
    position.trim() === "" ||
    jobLocation.trim() === ""
  ) {
    throw new BadRequest("Please provide all values");
  }
  
  if (position.length > 50) {
    throw new BadRequest(
      "Position is longer than the maximum allowed length (50)"
    );
  }

  if (company.length > 50) {
    throw new BadRequest(
      "Company is longer than the maximum allowed length (50)"
    );
  }

  const job = await jobModel.findOneAndUpdate(
    { _id: jobId, createdBy: userID },
    req.body,
    {
      runValidators: true,
    }
  );

  if (!job) {
    throw new NotFound(`There is no job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "job updated", job });
};

const deleteJob = async (req, res) => {
  const { userID } = req.user;
  const jobId = req.params.id;
  const job = await jobModel.deleteOne({
    _id: jobId,
    createdBy: userID,
  });

  if (!job) {
    throw new NotFound(`no job with id: ${jobId}`);
  }

  if (job.deletedCount < 1) {
    throw new NotFound(`There is no job with id: ${jobId}`);
  }
  console.log(job);
  res.status(StatusCodes.OK).json({ message: "job deleted" });
};

const showStats = async (req, res) => {
  res.status(200).send("showStats");
};

const deleteAllJobs = async (req, res) => {
  const deleteAll = await jobModel.deleteMany();
  res.status(200).json({ deleteAll });
};

// al remover, volver a hacer llamada api
export {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  deleteAllJobs,
};
