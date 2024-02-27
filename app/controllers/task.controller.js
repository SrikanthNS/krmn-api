const { isAdmin } = require("../helpers/checkUser");
const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        res.status(400).send({
            message: "Task description can not be empty!"
        });
        return;
    }

    if (!req.body.billingCategory) {
        res.status(400).send({
            message: "Please choose Task Category!"
        });
        return;
    }

    if (!req.body.taskType) {
        res.status(400).send({
            message: "Please choose Task Type!"
        });
        return;
    }

    // Create a Task

    const task = {
        description: req.body.description,
        completed: req.body.completed ? req.body.completed : false,
        minutesSpent: req.body.minutesSpent,
        date: new Date(req.body.date),
        userId: req.userId,
        clientId: req.body.clientId,
        reviewerId: req.body.completed ? req.body.reviewerId : null,
        taskType: req.body.taskType ? req.body.taskType : "",
        billingCategory: req.body?.billingCategory || ""
    };

    // Save Task in the database
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });
};


// Retrieve current User Tasks from the database.
exports.currentUserTasks = (req, res) => {
    Task.findAll({ where: { userId: req.userId }, order: [['date', 'DESC'], ['createdAt', 'DESC']] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tasks."
            });
        });
};

// Retrieve all tasks from the database.
exports.findAll = async (req, res) => {
    const isAdminUser = await isAdmin(req.userId);
    const description = req.query.description;
    let condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

    if (!isAdminUser) {
        condition = { userId: req.userId, ...condition }
    }

    Task.findAll({
        where: condition,
        order: [['date', 'DESC'], ['createdAt', 'DESC']]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });


};


// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Task with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task with id=" + id
            });
        });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    if (!req.body.description) {
        res.status(400).send({
            message: "Task description can not be empty!"
        });
        return;
    }

    if (!req.body.billingCategory) {
        res.status(400).send({
            message: "Please choose Task Category!"
        });
        return;
    }

    if (!req.body.taskType) {
        res.status(400).send({
            message: "Please choose Task Type!"
        });
        return;
    }

    Task.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tasks were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Tasks."
            });
        });
};

// Find all published Tasks
exports.findAllPublished = (req, res) => {
    Task.findAll({ where: { completed: true } })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tasks."
            });
        });
};
