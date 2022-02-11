const db = require("../models");
const { isAdmin } = require("../helpers/checkUser");
const Task = db.task;
const Client = db.client
const User = db.user
const Role = db.role;
const excel = require("exceljs");
const Op = db.Sequelize.Op;
const find = require('lodash/find')

const download = async (req, res) => {
    const description = req.query.description;
    let condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
    const isAdminUser = await isAdmin(req.userId);
    if (!isAdminUser) {
        condition = { userId: req.userId, ...condition }
    }

    Task.findAll({
        where: condition,
        order: [['date', 'DESC'], ['createdAt', 'DESC']]
    }).then(async (tasks) => {
        const tasksList = [];
        // get all Users
        const users = await User.findAll({ include: [{ model: Role, attributes: ['id'] }], attributes: ['id', 'username'] })

        // get all client list
        const clients = await Client.findAll({})


        tasks.forEach((task, index) => {
            const userName = find(users, (user) => user.id == task.userId)?.username || '';
            const reviewerName = task.reviewerId ? find(users, (user) => user.id == task.reviewerId)?.username : "";
            const clientName = find(clients, (client) => client.id == task.clientId)?.name || '';

            tasksList.push({
                id: index + 1,
                taskType: task.taskType,
                description: task.description,
                minutesSpent: `${task.minutesSpent} mins`,
                date: task.date,
                completed: task.completed ? "Completed" : "In-progress",
                ...(isAdminUser && { user: userName }),
                client: clientName,
                reviewer: reviewerName
            });
        });

        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("Tutorials");
        worksheet.columns = [
            { header: "Id", key: "id", width: 5 },
            (isAdminUser && { header: "User", key: "user", width: 25 }),
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
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=tasks_list_${new Date().toJSON().slice(0, 10)}.xlsx`
        );
        await workbook.xlsx.write(res);
        res.status(200).end();
    });
};

module.exports = {
    download,
};