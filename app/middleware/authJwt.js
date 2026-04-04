const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  let token;
  if (req.headers["authorization"]) {
    // read token from authorization header
    let bearerToken =
      req.headers["authorization"] || req.headers["x-access-token"];
    token = bearerToken.split(" ")[1];
  } else {
    // read token from x-access-token header
    token = req.headers["x-access-token"];
  }

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId, { include: [Role] })
    .then((user) => {
      if (!user) {
        return res.status(403).send({ message: "User not found!" });
      }
      const roles = user.roles || [];
      if (roles.some((r) => r.name === "admin")) {
        return next();
      }
      res.status(403).send({ message: "Require Admin Role!" });
    })
    .catch(() => {
      res.status(500).send({ message: "Unable to validate user role!" });
    });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId, { include: [Role] })
    .then((user) => {
      if (!user) {
        return res.status(403).send({ message: "User not found!" });
      }
      const roles = user.roles || [];
      if (roles.some((r) => r.name === "moderator")) {
        return next();
      }
      res.status(403).send({ message: "Require Moderator Role!" });
    })
    .catch(() => {
      res.status(500).send({ message: "Unable to validate user role!" });
    });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId, { include: [Role] })
    .then((user) => {
      if (!user) {
        return res.status(403).send({ message: "User not found!" });
      }
      const roles = user.roles || [];
      if (roles.some((r) => r.name === "moderator" || r.name === "admin")) {
        return next();
      }
      res.status(403).send({ message: "Require Moderator or Admin Role!" });
    })
    .catch(() => {
      res.status(500).send({ message: "Unable to validate user role!" });
    });
};

isSuperAdmin = (req, res, next) => {
  User.findByPk(req.userId, { include: [Role] })
    .then((user) => {
      if (!user) {
        return res.status(403).send({ message: "User not found!" });
      }
      const roles = user.roles || [];
      if (roles.some((r) => r.name === "superadmin")) {
        return next();
      }
      res.status(403).send({ message: "Require Super Admin Role!" });
    })
    .catch(() => {
      res.status(500).send({ message: "Unable to validate user role!" });
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isSuperAdmin: isSuperAdmin,
};
module.exports = authJwt;
