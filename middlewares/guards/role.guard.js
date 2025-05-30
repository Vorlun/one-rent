export default (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      console.log("Required roles:", requiredRoles);
      console.log("User role:", req.user.role); 

      if (!requiredRoles.includes(req.user.role)) {
        return res.status(401).json({ success: false, message: "Ruxsat yuq" });
      }
      next();
    } catch (error) {
      error.status = 403;
      next(error);
    }
  };
};
