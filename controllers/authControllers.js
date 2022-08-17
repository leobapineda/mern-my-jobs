import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

import UserModel from "../models/userModel.js";

// ERRORS
import { BadRequest, Unauthorize } from "../errors/index.js";
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequest("Please provide all values");
  }
  const user = await UserModel.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = (req, res) => {
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
