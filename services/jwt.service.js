import jwt from "jsonwebtoken";
import config from "config";

class JwtService {
  constructor({
    accessSecret,
    refreshSecret,
    accessExpiresIn,
    refreshExpiresIn,
  }) {
    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
    this.accessExpiresIn = accessExpiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpiresIn,
    });

    const refreshToken = jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token) {
    return jwt.verify(token, this.accessSecret);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshSecret);
  }
}

export const userJwtService = new JwtService({
  accessSecret: config.get("jwt.user.accessSecret"),
  refreshSecret: config.get("jwt.user.refreshSecret"),
  accessExpiresIn: config.get("jwt.user.accessExpiresIn"),
  refreshExpiresIn: config.get("jwt.user.refreshExpiresIn"),
});
