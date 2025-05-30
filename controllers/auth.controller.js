import { Users } from "../models/users.model.js";
import bcrypt from "bcrypt";
import { userJwtService } from "../services/jwt.service.js";
import c from "config";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    if (!user) {
      return res.status(401).json({ message: "Email parol xato" });
    }

    const verify_password = bcrypt.compare(password, user.hashed_password);
    if (!verify_password) {
      return res.status(401).json({ message: "Email parol xato" });
    }

    const payload = {
      id: user.id,
      email: user.id,
      roles: user.roles,
    };

    const tokens = JwtService.generateTokens(payload);

    const hashed_token = await bcrypt(tokens.refreshToken, 7)
    user.hashed_token = hashed_token
    await user.save()

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: c.get("maxAge"),
      httpOnly: true,
    });
    res.status(200).json({ message: "User login in" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }
    
    const decodedToken = await JwtService.verifyRefreshToken(refreshToken)
    
    const user = await Users.update({refreshToken:null},{where: {id: decodedToken.id},returning:true});
    

    if (!user) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }


    res.clearCookie("refreshToken");
    res.send({ user });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    await JwtService.verifyRefreshToken(refreshToken);

    const user = await Users.update(
      { refreshToken: null },
      { where: { id: decodedToken.id }, returning: true }
    );

    if (!user) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }
    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_expert: author.is_expert,
    };

    const tokens = authorJwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(201).send({
      message: "Tokenlar yangilandi",
      id: author.id,
      accessToken: tokens.accessToken,
    });


  try {
  } catch (error) {
    next(error);
  }
};
