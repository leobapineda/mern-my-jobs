const createJob = async (req, res) => {
  const {useId} = req.user
    res.status(200).json({ success: "Authorization  successful ", useId });

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
