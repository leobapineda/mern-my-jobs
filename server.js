import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
dotenv.config();
import express from "express";
const app = express();
import connectDB from "./db/connect.js";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// ROUTERS
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
// MIDDLEWARE
import NotFoundMiddleware from "./middleware/notFound.js";
// import ErrorHanlderMiddleware from "./middleware/error-handler.js";
import ErrorHanlderMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/TokenAuth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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
