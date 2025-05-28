export function errorHandler(err, req, res, next) {
  console.error("❌ ERROR:", err);

  if (process.env.NODE_ENV === "development" && err.stack) {
    console.error("🔍 STACK TRACE:\n", err.stack);
  }

  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      type: "JoiValidationError",
      message: err.details?.[0]?.message || "Validation error",
    });
  }

  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      type: "PostgresUniqueViolation",
      message: "Duplicate key error",
      detail: err.detail,
    });
  }

  if (err.code) {
    return res.status(400).json({
      success: false,
      type: "PostgresError",
      message: err.message || "Database error",
      code: err.code,
    });
  }

  if (err.status && err.message) {
    return res.status(err.status).json({
      success: false,
      type: "CustomError",
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    type: "InternalServerError",
    message: "Something went wrong on the server",
  });
}

export default errorHandler;
