import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequest,
  NotFound,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

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
  const { status, jobType, search, sort } = req.query;
  const { userID } = req.user;

  // checkPermissions(req.user, findJob.createdBy);

  const queryObject = {};
  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let sortValue;

  if (sort) {
    switch (sort) {
      case "latest":
        sortValue = { createdAt: -1 };
        break;
      case "oldest":
        sortValue = { createdAt: 1 };
        break;
      case "a-z":
        sortValue = { position: 1 };
        break;
      case "z-a":
        sortValue = { position: -1 };
        break;
    }
  }

  //we use Number() because the query values is a string, so we need to convert it to Number
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * 10;

  const jobs = await jobModel
    .find({...queryObject, createdBy: userID })
    .sort(sortValue)
    .skip(skip)
    .limit(limit);
  // countDocuments gives us the number of documents in the data base that math the filter, in this case the filter is: queryObject
  const totalJobs = await jobModel.countDocuments({
    ...queryObject,
    createdBy: userID,
  });
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ totalJobs, numOfPages, jobs });
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

  const findJob = await jobModel.findOne({ _id: jobId });

  if (!findJob) {
    throw new NotFound(`There is no job with id: ${jobId}`);
  }

  //  check for permission
  //here we are checking if the user that is login is the one that created the job
  //because anohter user could get the job id of another user's job and modify it
  //we are obtaining the user to check the id with the id if one job was found when using the findOne in the findJob
  checkPermissions(req.user, findJob.createdBy);

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

  res.status(StatusCodes.OK).json({ message: "job updated", job });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;

  const findJob = await jobModel.findOne({ _id: jobId });

  if (!findJob) {
    throw new NotFound(`There is no job with id: ${jobId}`);
  }

  checkPermissions(req.user, findJob.createdBy);

  await findJob.remove();

  res.status(StatusCodes.OK).json({ message: "job deleted" });
};

const showStats = async (req, res) => {
  let stats = await jobModel.aggregate([
    {
      //req.user.userID is a string, so we need to convert it to a mongoose object id with mongoose.Types.ObjectId
      $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) },
    },
    {
      $group: { _id: "$status", count: { $sum: 1 } },
    },
  ]);

  stats = stats.reduce((accu, stat) => {
    accu[stat._id] = stat.count;
    return accu;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await jobModel.aggregate([
    {
      //1.- we get the values that math the user id
      //convert req.user.userID to mongodb object id
      $match: { createdBy: mongoose.Types.ObjectId(req.user.userID) },
    },
    {
      //2.- group the user by year and month
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    // here we sort them by year and month, getting the latest first
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    // here we say that we only want the first 6 results
    { $limit: 6 },
  ]);

  //here we need to give it another format that will be easier to work with in the frontend
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      //accpets 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
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

//buscamos por filtro, buscar por status, type
