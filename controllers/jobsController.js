const createJob = async (req, res) => {
  res.status(200).send("createJob");
};

const getAllJobs = async (req, res) => {
  res.status(200).send("getAllJobs");
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

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
