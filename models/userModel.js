import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [3, "Name must be at least 3 characters long"],
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
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
    trim: true,
  },
  lastName: {
    type: String,
    maxLength: 20,
    default: "last name",
    trim: true,
  },
  location: {
    type: String,
    maxLength: 20,
    default: "my city",
    trim: true,
  },
});

// METHODS
// HASH PASSWORD
userSchema.pre("save", async function () {
  // si no modifico password, no ejecutes esta logica
  if(!this.isModified("password")) return
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// COMPARE PASSWORDS
userSchema.methods.VerifyPassword = async function (enteredPwd) {
  return await bcrypt.compare(enteredPwd, this.password);
};

// CREATE JWT
userSchema.methods.createJWT = async function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
export default mongoose.model("User", userSchema);
