const filter = require('lodash/filter');
const map = require('lodash/map');
const partialRight = require('lodash/partialRight');
const pick = require('lodash/pick');
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

    User.findAll({ include: [{ model: Role, attributes: ['id'] }], attributes: ['id', 'username'] }).then((users) => {
        const filteredUsers = filter(users, (user) => {

            const roleList = filter(user.roles, (role) => role.user_roles.roleId > 1)
            if (roleList.length) return true;
            return false
        });
        var reviewers = map(filteredUsers, partialRight(pick, ['id', 'username']));

        res.status(200).send(reviewers);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving user list."
        });
    });
}


exports.findAllUsers = (_req, res) => {

    User.findAll({ include: [{ model: Role, attributes: ['id'] }], attributes: ['id', 'username'] })
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user list."
            });
        });
}