import jwt from "jsonwebtoken";
import config from "config";

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token malformed" });
    }

    const decodedToken = jwt.verify(token, config.get("jwt.user.accessSecret"));
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
