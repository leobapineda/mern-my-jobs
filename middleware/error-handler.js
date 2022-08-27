import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

const ErrorHanlderMiddleware = (err, req, res, next) => {
  const CustomObject = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Oops, something went wrong, try again later",
  };

  if (err.code && err.code === 11000) {
    CustomObject.statusCode = StatusCodes.FORBIDDEN;
    CustomObject.message = "Can't use this email, please try another one";
  }

  if (err.name === "ValidationError") {
    CustomObject.statusCode = StatusCodes.BAD_REQUEST;
    CustomObject.message = Object.values(err?.errors)
      .map((error) => error?.message)
      .join(". ");
  }

  // console.log(err);
  res.status(CustomObject.statusCode).json({ message: CustomObject.message });
  // res.status(CustomObject.statusCode).json({ err });
};

export default ErrorHanlderMiddleware;
