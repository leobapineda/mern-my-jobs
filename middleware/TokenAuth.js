import jwt from "jsonwebtoken";

import {
  BadRequest,
  Unauthenticated,
  NotFound,
  Forbidden,
} from "../errors/index.js";

const Authorization = async (req, res, next) => {
  const BearerToken = req.headers.authorization;
  // console.log(BearerToken);
  if (!BearerToken || !BearerToken.startsWith("Bearer ")) {
    throw new Unauthenticated("No token present");
  }
  const token = BearerToken.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userID: payload.userId };
    next();
  } catch (error) {
    next(error);
    // he just sends this error
    // throw new Unauthenticated("Authentication Invalid");
  }
};

export default Authorization;
