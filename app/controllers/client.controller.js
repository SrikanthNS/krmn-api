const db = require("../models");

const Client = db.client;

// Retrieve all Clients from the database.
exports.findAll = (_req, res) => {
    Client.findAll({ attributes: ['id', 'name'] }).then(clients => {
        res.send(clients);
    })
}
