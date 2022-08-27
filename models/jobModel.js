import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      maxLength: 50,
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxLength: 50,
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Please provide status"],
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    jobType: {
      type: String,
      required: [true, "Please provide job type"],
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      required: [true, "Please provide job location"],
      default: "my city",
      maxLength: 30,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide author"],
      trim: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("job", jobSchema);
