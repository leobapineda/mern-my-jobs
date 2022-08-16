import mongoose from "mongoose";

const connectDB = async (uri) => {
  return mongoose.connect(uri);
};


export default connectDB;

// {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   }