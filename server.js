import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectDB from "./db/connect.js";

// MIDDLEWARE
import NotFoundMiddleware from "./middleware/notFound.js";
import ErrorHanlderMiddleware from "./middleware/error-handler.js";
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hi there");
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
