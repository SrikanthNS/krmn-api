const { isAdmin, isAdminOrMod } = require("../helpers/checkUser");
const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: "Task description can not be empty!",
    });
    return;
  }

  if (!req.body.billingCategory) {
    res.status(400).send({
      message: "Please choose Task Category!",
    });
    return;
  }

  if (!req.body.taskType) {
    res.status(400).send({
      message: "Please choose Task Type!",
    });
    return;
  }

  // Create a Task
  // Determine status: support new 'status' field, fall back to 'completed' boolean
  let taskStatus =
    req.body.status || (req.body.completed ? "completed" : "in-progress");
  const isCompleted = taskStatus === "completed";

  // Helper: safely parse an integer, return null if invalid
  const safeInt = (v) => {
    if (v === null || v === undefined || v === "") return null;
    const n = parseInt(v, 10);
    return isNaN(n) ? null : n;
  };

  // Admin/Mod can assign to another user
  let assignedUserId = req.userId;
  const bodyUserId = safeInt(req.body.userId);
  if (bodyUserId) {
    const canAssign = await isAdminOrMod(req.userId);
    if (canAssign) {
      assignedUserId = bodyUserId;
    }
  }

  // If admin assigned to someone else, record who assigned it
  const wasAssigned =
    safeInt(assignedUserId) !== null &&
    safeInt(assignedUserId) !== safeInt(req.userId);

  const task = {
    description: req.body.description,
    completed: isCompleted,
    status: taskStatus,
    minutesSpent: safeInt(req.body.minutesSpent),
    date: new Date(req.body.date),
    userId: safeInt(assignedUserId),
    clientId: safeInt(req.body.clientId),
    reviewerId: isCompleted ? safeInt(req.body.reviewerId) : null,
    taskType: req.body.taskType ? req.body.taskType : "",
    billingCategory: req.body?.billingCategory || "",
    assignedBy: wasAssigned ? req.userId : null,
  };

  // Save Task in the database
  Task.create(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};

// Retrieve current User Tasks from the database.
exports.currentUserTasks = (req, res) => {
  Task.findAll({
    where: { userId: req.userId },
    order: [
      ["date", "DESC"],
      ["createdAt", "DESC"],
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};

// Retrieve all tasks from the database.
exports.findAll = async (req, res) => {
  const isAdminUser = await isAdmin(req.userId);
  const description = req.query.description;
  const page = parseInt(req.query.page) || 1;
  const size = Math.min(parseInt(req.query.size) || 20, 100);
  const sortField = req.query.sortField || "date";
  const sortDir = req.query.sortDir === "asc" ? "ASC" : "DESC";

  // Filters
  const status = req.query.status; // comma-separated
  const clientId = req.query.clientId; // comma-separated
  const userId = req.query.userId; // comma-separated
  const reviewerId = req.query.reviewerId; // comma-separated
  const taskType = req.query.taskType; // comma-separated
  const billingCategory = req.query.billingCategory; // comma-separated
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;

  let condition = {};
  if (description) condition.description = { [Op.like]: `%${description}%` };
  if (!isAdminUser) condition.userId = req.userId;
  if (status) {
    const statuses = status.split(",");
    condition.status = { [Op.in]: statuses };
  }
  if (clientId) condition.clientId = { [Op.in]: clientId.split(",") };
  if (userId && isAdminUser) condition.userId = { [Op.in]: userId.split(",") };
  if (reviewerId) condition.reviewerId = { [Op.in]: reviewerId.split(",") };
  if (taskType) condition.taskType = { [Op.in]: taskType.split(",") };
  if (billingCategory)
    condition.billingCategory = { [Op.in]: billingCategory.split(",") };
  if (dateFrom || dateTo) {
    condition.date = {};
    if (dateFrom) condition.date[Op.gte] = dateFrom;
    if (dateTo) condition.date[Op.lte] = dateTo + " 23:59:59";
  }

  // Allowed sort fields
  const allowedSorts = {
    date: "date",
    time: "minutesSpent",
    minutesSpent: "minutesSpent",
    type: "taskType",
    taskType: "taskType",
    client: "clientId",
    clientId: "clientId",
    createdAt: "createdAt",
  };
  const orderCol = allowedSorts[sortField] || "date";

  const offset = (page - 1) * size;

  try {
    const { count, rows } = await Task.findAndCountAll({
      where: condition,
      include: [
        {
          model: db.user,
          as: "assigner",
          attributes: ["id", "username"],
        },
      ],
      order: [
        [orderCol, sortDir],
        ["createdAt", "DESC"],
      ],
      limit: size,
      offset,
    });

    // Status counts (with all non-status filters applied)
    const countCondition = { ...condition };
    delete countCondition.status;
    const allForCounts = await Task.findAll({
      where: countCondition,
      attributes: ["status", "completed"],
    });
    const statusCounts = { todo: 0, "in-progress": 0, completed: 0 };
    allForCounts.forEach((t) => {
      const s = t.status || (t.completed ? "completed" : "in-progress");
      if (statusCounts[s] !== undefined) statusCounts[s]++;
    });

    res.send({
      rows,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      statusCounts,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  }
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id,
      });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  if (!req.body.description) {
    res.status(400).send({
      message: "Task description can not be empty!",
    });
    return;
  }

  if (!req.body.billingCategory) {
    res.status(400).send({
      message: "Please choose Task Category!",
    });
    return;
  }

  if (!req.body.taskType) {
    res.status(400).send({
      message: "Please choose Task Type!",
    });
    return;
  }

  // Helper: safely parse an integer, return null if invalid
  const safeInt = (v) => {
    if (v === null || v === undefined || v === "") return null;
    const n = parseInt(v, 10);
    return isNaN(n) ? null : n;
  };

  // Determine status
  let taskStatus =
    req.body.status || (req.body.completed ? "completed" : "in-progress");
  const isCompleted = taskStatus === "completed";

  const updateData = {
    description: req.body.description,
    completed: isCompleted,
    status: taskStatus,
    minutesSpent: safeInt(req.body.minutesSpent),
    date: req.body.date ? new Date(req.body.date) : undefined,
    userId: safeInt(req.body.userId),
    clientId: safeInt(req.body.clientId),
    reviewerId: isCompleted ? safeInt(req.body.reviewerId) : null,
    taskType: req.body.taskType || "",
    billingCategory: req.body.billingCategory || "",
  };

  Task.update(updateData, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tasks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Tasks.",
      });
    });
};

// Find all published Tasks
exports.findAllPublished = (req, res) => {
  Task.findAll({ where: { completed: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tasks.",
      });
    });
};
