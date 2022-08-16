const ErrorHanlderMiddleware = (err, req, res, next) => {
  const CustomObject = {
    statusCode: err.statusCode || 500,
    message: err.message || "Oops, something went wrong, try again later",
  };
  console.log(err);
  res.status(CustomObject.statusCode).json({ message: CustomObject.message });
};

export default ErrorHanlderMiddleware;
