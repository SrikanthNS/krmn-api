const db = require("../models");
const config = require("../config/auth.config");
const {
  user: User,
  role: Role,
  refreshToken: RefreshToken,
  featureFlag: FeatureFlag,
} = db;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was created successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was created successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!user.isActive) {
        return res.status(403).send({
          accessToken: null,
          message:
            "Your account has been deactivated. Please contact an administrator.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      let refreshToken = await RefreshToken.createToken(user);
      var authorities = [];
      const roles = await user.getRoles();
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }

      // Fetch feature flags
      const flags = await FeatureFlag.findAll();
      const featureFlags = {};
      flags.forEach((f) => {
        featureFlags[f.key] = f.enabled;
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        itemsPerPage: user.itemsPerPage || 20,
        darkModeSettings: (() => {
          try {
            return JSON.parse(user.darkModeSettings);
          } catch {
            return { mode: "off", customFrom: "20:00", customTo: "06:00" };
          }
        })(),
        featureFlags,
        accessToken: token,
        refreshToken: refreshToken,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .send({ message: "Current password and new password are required." });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .send({ message: "New password must be at least 6 characters." });
  }

  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Current password is incorrect." });
    }

    user.password = bcrypt.hashSync(newPassword, 8);
    await user.save();

    res.status(200).send({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
