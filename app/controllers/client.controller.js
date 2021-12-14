const db = require("../models");

const Client = db.client;

// Retrieve all Clients from the database.
exports.findAll = (_req, res) => {
    Client.findAll({ attributes: ['id', 'name'] }).then(clients => {
        res.send(clients);
    })
}



exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Client name cannot be empty!"
        });
        return;
    }
    const name = req.body.name
    Client.create(name)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });
}
