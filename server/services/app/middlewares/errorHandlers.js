function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "Invalid email/password") {
    status = 401;
    message = "Invalid email/password";
  } else if (err.name === "email cannot empty") {
    status = 400;
    message = "email cannot empty";
  } else if (err.name === "password cannot empty") {
    status = 400;
    message = "password cannot empty";
  } else if (err.name === "Product not found") {
    status = 404;
    message = "Product not found";
  } else if (err.name === "Category not found") {
    status = 404;
    message = "Category not found";
  } else if (err.name === "not_found") {
    status = 404;
    message = "Product not found";
  } else if (err.name === "forbidden") {
    status = 403;
    message = "forbidden";
  } else if (err.name === "staff_delete") {
    status = 401;
    message = "Unauthorized";
  } else if (err.name === "Ingredients cannot empty") {
    status = 400;
    message = err.name;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
