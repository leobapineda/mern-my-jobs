import { StatusCodes } from "http-status-codes";
import UserModel from "../models/userModel.js";
// ERRORS
import {
  BadRequest,
  Unauthenticated,
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
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new Unauthenticated("Email does not match any account");
  const isPasswordCorrect = await user.VerifyPassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("The password is incorrect");
  }
  user.password = undefined;
  const token = await user.createJWT();
  res.status(200).json({
    user,
    location: user.location,
    token,
  });
};

const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body;
  if (!name.trim() || !lastName.trim() || !email.trim() || !location.trim()) {
    throw new BadRequest("Please provide all values ");
  }
  const user = await UserModel.findOne({ _id: req.user.userID });
  
  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save()

  const token = await user.createJWT()
 
  res.status(200).json({
    user, token, location: user.location
  });
};


export { login, register, updateUser};
