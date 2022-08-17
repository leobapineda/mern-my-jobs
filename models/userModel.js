import validator from "validator";

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
      // validator: () => validator.isEmail(this.email),
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

export default mongoose.model("User", userSchema);
