import express from "express";
const router = express.Router();
import {
  login,
  register,
  updateUser,
  deleteAllUsers,
} from "../controllers/authControllers.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/updateUser").patch(updateUser);
router.route("/").delete(deleteAllUsers);

export default router;
