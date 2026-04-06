const db = require("../models");
const { isAdmin } = require("../helpers/checkUser");
const Task = db.task;
const Client = db.client;
const User = db.user;
const Role = db.role;
const excel = require("exceljs");
const Op = db.Sequelize.Op;
const find = require("lodash/find");

const download = async (req, res) => {
  const isAdminUser = await isAdmin(req.userId);

  // Build filter condition (same filters as findAll)
  const description = req.query.description;
  const status = req.query.status;
  const clientId = req.query.clientId;
  const userId = req.query.userId;
  const reviewerId = req.query.reviewerId;
  const taskType = req.query.taskType;
  const billingCategory = req.query.billingCategory;
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;
  const sortField = req.query.sortField || "date";
  const sortDir = req.query.sortDir === "asc" ? "ASC" : "DESC";

  let condition = {};
  if (description) condition.description = { [Op.like]: `%${description}%` };
  if (!isAdminUser) condition.userId = req.userId;
  if (status) condition.status = { [Op.in]: status.split(",") };
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

  const allowedSorts = {
    date: "date",
    minutesSpent: "minutesSpent",
    taskType: "taskType",
    clientId: "clientId",
    createdAt: "createdAt",
  };
  const orderCol = allowedSorts[sortField] || "date";

  Task.findAll({
    where: condition,
    order: [
      [orderCol, sortDir],
      ["createdAt", "DESC"],
    ],
  }).then(async (tasks) => {
    const tasksList = [];
    // get all Users
    const users = await User.findAll({
      include: [{ model: Role, attributes: ["id"] }],
      attributes: ["id", "username"],
    });

    // get all client list
    const clients = await Client.findAll({});

    tasks.forEach((task, index) => {
      const userName =
        find(users, (user) => user.id == task.userId)?.username || "";
      const reviewerName = task.reviewerId
        ? find(users, (user) => user.id == task.reviewerId)?.username
        : "";
      const clientName =
        find(clients, (client) => client.id == task.clientId)?.name || "";

      tasksList.push({
        id: index + 1,
        taskType: task.taskType,
        description: task.description,
        minutesSpent: `${task.minutesSpent} mins`,
        date: task.date,
        completed: task.completed ? "Completed" : "In-progress",
        ...(isAdminUser && { user: userName }),
        client: clientName,
        reviewer: reviewerName,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");
    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      isAdminUser && { header: "User", key: "user", width: 25 },
      { header: "Client", key: "client", width: 10 },
      { header: "Type", key: "taskType", width: 10 },
      { header: "Description", key: "description", width: 25 },
      { header: "Date", key: "date", width: 10 },
      { header: "Time Spent", key: "minutesSpent", width: 10 },
      { header: "Status", key: "completed", width: 10 },
      { header: "Reviewer", key: "reviewer", width: 10 },
    ];
    worksheet.addRows(tasksList);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=tasks_list_${new Date().toJSON().slice(0, 10)}.xlsx`,
    );
    await workbook.xlsx.write(res);
    res.status(200).end();
  });
};

module.exports = {
  download,
};
