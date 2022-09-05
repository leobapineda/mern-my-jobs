import express from "express";
const router = express.Router();
import { login, register, updateUser } from "../controllers/authControllers.js";
import authenticateUser from "../middleware/TokenAuth.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  //time in minutes: 15
  windowMs: 15 * 60 * 1000,
  max: 15,
  message:
    "Too many requests from this API adress, please try again after 15 minutes",
});

router.route("/login").post(apiLimiter, login);
router.route("/register").post(apiLimiter, register);
router.route("/updateUser").patch(authenticateUser, updateUser);
export default router;
