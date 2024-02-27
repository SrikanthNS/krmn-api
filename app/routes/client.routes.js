const { authJwt } = require("../middleware");

module.exports = app => {
    const client = require("../controllers/client.controller.js");

    var router = require("express").Router();

    // Create a new Client
    router.post("/", [authJwt.verifyToken], client.create);


    // Retrieve all clients
    router.get("/", [authJwt.verifyToken], client.findAll);

    // Retrieve a single Client with id
    router.get("/:id", [authJwt.verifyToken], client.findOne);

    // Update a Client with id
    router.put("/:id", [authJwt.verifyToken], client.update);

    // Delete a Task with id
    router.delete("/:id", [authJwt.verifyToken], client.delete);

    // Delete all task
    router.delete("/", [authJwt.verifyToken], client.deleteAll);


    app.use('/api/clients', router);
};