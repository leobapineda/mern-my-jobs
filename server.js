import dotenv from "dotenv";
import "express-async-errors";
// require("express-async-errors");

dotenv.config();
import express from "express";
const app = express();
import connectDB from "./db/connect.js";

// ROUTERS
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
// MIDDLEWARE
import NotFoundMiddleware from "./middleware/notFound.js";
// import ErrorHanlderMiddleware from "./middleware/error-handler.js";
import ErrorHanlderMiddleware from "./middleware/error-handler.js";

app.use(express.json());

app.get("/", (req, res) => {
  // throw new Error(" i am server error")
  res.status(200).send("hi there");
});

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

// USE MIDDLEWARE
app.use(NotFoundMiddleware);
app.use(ErrorHanlderMiddleware);

const port = process.env.PORT || 5000;
async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to mongoDB!");
    app.listen(port, () => console.log("listening on port " + port));
  } catch (error) {
    console.log(error);
  }
}

start();
