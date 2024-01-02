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
          (role) => role.user_roles.roleId > 1
        );
        if (roleList.length) return true;
        return false;
      });
      var reviewers = map(
        filteredUsers,
        partialRight(pick, ["id", "username"])
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
    attributes: ["id", "username"],
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

  User.findByPk(id)
    .then((data) => {
      if (data) {
        console.log("🚀 ~ file: user.controller.js:78 ~ .then ~ data:", data);
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

// Update a Client by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Client was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Client with id=" + id,
      });
    });
};
