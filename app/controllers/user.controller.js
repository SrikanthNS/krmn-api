const filter = require("lodash/filter");
const map = require("lodash/map");
const partialRight = require("lodash/partialRight");
const pick = require("lodash/pick");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// Retrieve all Reviewers from the database.
exports.findAllReviewers = (_req, res) => {
  User.findAll({
    include: [{ model: Role, attributes: ["id"] }],
    attributes: ["id", "username"],
  })
    .then((users) => {
      const filteredUsers = filter(users, (user) => {
        const roleList = filter(
          user.roles,
          (role) => role.user_roles.roleId > 1,
        );
        if (roleList.length) return true;
        return false;
      });
      var reviewers = map(
        filteredUsers,
        partialRight(pick, ["id", "username"]),
      );

      res.status(200).send(reviewers);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user list.",
      });
    });
};

exports.findAllUsers = (req, res) => {
  const name = req.query.name;
  let condition = name ? { username: { [Op.like]: `%${name}%` } } : null;
  User.findAll({
    where: condition,
    include: [{ model: Role, attributes: ["id"] }],
    attributes: ["id", "username", "isActive"],
  })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user list.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: [
      { model: Role, attributes: ["id", "name"], through: { attributes: [] } },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const { roles, ...userData } = req.body;

  User.update(userData, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        if (roles && Array.isArray(roles)) {
          return User.findByPk(id).then((user) => {
            return Role.findAll({
              where: { name: { [db.Sequelize.Op.or]: roles } },
            }).then((foundRoles) => {
              return user.setRoles(foundRoles).then(() => {
                res.send({ message: "User was updated successfully." });
              });
            });
          });
        }
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Soft delete (deactivate) a User by id
exports.deactivate = (req, res) => {
  const id = req.params.id;

  User.update(
    { isActive: false },
    {
      where: { id: id },
    },
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          id: parseInt(id),
          isActive: false,
          message: "User was deactivated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot deactivate User with id=${id}. User not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deactivating User with id=" + id,
      });
    });
};

// Reactivate a User by id
exports.activate = (req, res) => {
  const id = req.params.id;

  User.update(
    { isActive: true },
    {
      where: { id: id },
    },
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          id: parseInt(id),
          isActive: true,
          message: "User was activated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot activate User with id=${id}. User not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error activating User with id=" + id,
      });
    });
};

// Update user preferences
exports.updatePreferences = (req, res) => {
  const id = req.userId;
  const { itemsPerPage, darkModeSettings } = req.body;

  const ALLOWED_PAGE_SIZES = [10, 20, 50, 100];
  if (
    itemsPerPage !== undefined &&
    !ALLOWED_PAGE_SIZES.includes(itemsPerPage)
  ) {
    return res.status(400).send({
      message: `itemsPerPage must be one of: ${ALLOWED_PAGE_SIZES.join(", ")}`,
    });
  }

  if (darkModeSettings !== undefined) {
    const ALLOWED_MODES = ["off", "on", "sunset_sunrise", "custom"];
    if (
      !darkModeSettings.mode ||
      !ALLOWED_MODES.includes(darkModeSettings.mode)
    ) {
      return res.status(400).send({ message: "Invalid dark mode setting." });
    }
  }

  const updates = {};
  if (itemsPerPage !== undefined) updates.itemsPerPage = itemsPerPage;
  if (darkModeSettings !== undefined)
    updates.darkModeSettings = JSON.stringify(darkModeSettings);

  if (Object.keys(updates).length === 0) {
    return res.status(400).send({ message: "No valid preferences provided." });
  }

  User.update(updates, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ ...updates, message: "Preferences updated successfully." });
      } else {
        res.status(404).send({ message: "User not found." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating preferences.",
      });
    });
};
