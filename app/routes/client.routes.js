
module.exports = app => {
    const client = require("../controllers/client.controller.js");

    var router = require("express").Router();

    // Retrieve all clients
    router.get("/", client.findAll);

    app.use('/api/clients', router);
};