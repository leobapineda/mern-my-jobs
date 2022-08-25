import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide author"],
      maxLength: 20,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxLength: 20,
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxLength: 20,
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Please provide position"],
      default: "interview",
      enum: ["interview", "pending", "declined"],
      trim: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("job", jobSchema);
