import UserModel from "../models/userModel.js";
const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  res.status(200).json({ user });
};

const login = (req, res) => {
  res.status(200).send("login");
};

const updateUser = (req, res) => {
  res.status(200).send("updateUser");
};

const deleteAllUsers = async (req, res) => {
  const a = await UserModel.deleteMany();
  // res.status(200).send("all users deleted");
  res.status(200).json({deleted: a.deletedCount});

};

export { login, register, updateUser, deleteAllUsers };
