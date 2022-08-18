import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    required: [true, "Please provide email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "last name",
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "my city",
  },
});

// METHODS
// HASH PASSWORD
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// COMPARE PASSWORDS
userSchema.methods.VerifyPassword = async function (enteredPwd) {
  const isPassword = await bcrypt.hash(enteredPwd, this.password);
  return isPassword;
};

userSchema.methods.createJWT = async function () {
  const token = await jwt.sign({useId: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};
export default mongoose.model("User", userSchema);
