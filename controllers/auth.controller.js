import { Users } from "../models/users.model.js";
import bcrypt from "bcrypt";
import { userJwtService } from "../services/jwt.service.js";
import config from "config";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Email yoki parol xato" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Email yoki parol xato" });

    const payload = { id: user.id, email: user.email, role: user.role };
    const tokens = userJwtService.generateTokens(payload);

    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_token = hashedRefresh;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: config.get("jwt.cookieMaxAge"),
    });

    res.status(200).json({
      message: "Login muvaffaqiyatli",
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(401).json({ message: "Token topilmadi" });

    const decoded = userJwtService.verifyRefreshToken(refreshToken);
    const user = await Users.findByPk(decoded.id);
    if (!user)
      return res.status(401).json({ message: "Foydalanuvchi topilmadi" });

    const isValid = await bcrypt.compare(refreshToken, user.hashed_token);
    if (!isValid) return res.status(401).json({ message: "Token noto'g'ri" });

    const payload = { id: user.id, email: user.email };
    const tokens = userJwtService.generateTokens(payload);

    user.hashed_token = await bcrypt.hash(tokens.refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: config.get("jwt.cookieMaxAge"),
    });

    res.status(200).json({
      message: "Token yangilandi",
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(400).json({ message: "Token topilmadi" });

    const decoded = userJwtService.verifyRefreshToken(refreshToken);
    const user = await Users.findByPk(decoded.id);
    if (!user)
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

    user.hashed_token = null;
    await user.save();

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout muvaffaqiyatli" });
  } catch (err) {
    next(err);
  }
};
