import { StatusCodes } from "http-status-codes";
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

  const user = await UserModel.create({ name, email, password });

  const token = await user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequest("Please provide all values");
  const User = await UserModel.findOne({ email }).select("+password");
  if (!User) throw new Unauthorize("Email does not match any account");
  const isPassword = await User.VerifyPassword(password);
  if (!isPassword) {
    throw new Unauthorize("The password is incorrect");
  }

  //  CUAL ES LA RESPUESTA
  res.status(200).json({
    message: `Welcome ${User.name}`,
    email: User.email,
    name: User.name,
  });
};

const updateUser = (req, res) => {
  res.status(200).send("updateUser");
};

// HELPER FUNCTIONS
const deleteAllUsers = async (req, res) => {
  const a = await UserModel.deleteMany();
  res.status(200).json({ deleted: a.deletedCount });
};

const showUsers = async (req, res) => {
  const Users = await UserModel.find();
  res.status(200).json({ No: Users.length, Users });
};

export { login, register, updateUser, deleteAllUsers, showUsers };
