import jwt from "jsonwebtoken";

import {
  BadRequest,
  Unauthenticated,
  NotFound,
  Forbidden,
} from "../errors/index.js";

const Authorization = async (req, res, next) => {
  const BearerToken = req.headers.authorization;
  if (!BearerToken || !BearerToken.startsWith("Bearer ")) {
    throw new Unauthenticated("No token present");
  }
  const token = BearerToken.split(" ")[1];
  const verifyJWT = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = verifyJWT;
  next();
};

export default Authorization;
