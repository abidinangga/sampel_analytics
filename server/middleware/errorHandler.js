function errorHandler(err, req, res, next) {
    switch (err.name) {
      case "notFound":
        res.status(404).json({
          message: err.message,
        });
        break;
      default:
        res.status(500).json({
          message: err,
        });
        break;
    }
  }
  module.exports = { errorHandler };
  