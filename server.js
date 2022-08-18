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
import AuthorizationMiddleware from "./middleware/TokenAuthorization.js"
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({log: "message"});
});

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", AuthorizationMiddleware, jobsRouter);

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
