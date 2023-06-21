const customError = async (err, req, res, next) => {
  try {
    let statusCode = err.statusCode || 500;
    let statusMessage = err.statusMessage || "Internal Server error";
    let errorResponse = {
      statusCode: statusCode,
      statusMessage: statusMessage,
      stack: process.env.NODE_ENVIRONMENT === "development" ? err.stack : {},
    };

    if (err.error) {
      errorResponse.error = err.error;
    }
    console.log(errorResponse);

    res.status(statusCode).json(errorResponse);
  } catch (error) {
    console.log(`Error in customError middleware -> ${error}`);
  }
};

module.exports = {
  customError,
};
