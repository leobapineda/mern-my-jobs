import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";

// ERRORS
import {
  BadRequest,
  Unauthorize,
  NotFound,
  Forbidden,
} from "../errors/index.js";
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequest("Please provide all values");
  }

  const repitedEmail = await UserModel.findOne({ email });
  if (repitedEmail) {
    throw new BadRequest("Email already in use. Please try another one");
  }

  // HASH PASSWORD
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(password, salt);
  // HASH PASSWORD

  const user = await UserModel.create({ name, email, password: hashPassword });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.status(200).send("login");
};

const updateUser = (req, res) => {
  res.status(200).send("updateUser");
};

const deleteAllUsers = async (req, res) => {
  const a = await UserModel.deleteMany();
  res.status(200).json({ deleted: a.deletedCount });
};

const showUsers = async (req, res) => {
  const Users = await UserModel.find();
  res.status(200).json({ No: Users.length, Users });
};

export { login, register, updateUser, deleteAllUsers, showUsers };
