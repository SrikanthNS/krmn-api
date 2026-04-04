if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET environment variable is required in production");
}

module.exports = {
  secret: process.env.JWT_SECRET || "krmn-dev-secret-key",
  jwtExpiration: Number.parseInt(process.env.JWT_EXPIRATION, 10) || 3600, // 1 hour
  jwtRefreshExpiration:
    Number.parseInt(process.env.JWT_REFRESH_EXPIRATION, 10) || 86400, // 24 hours
};
