const { authJwt } = require("../middleware");

module.exports = app => {
    const task = require("../controllers/task.controller.js");

    var router = require("express").Router();

    // Create a new Task
    router.post("/", [authJwt.verifyToken], task.create);

    // Retrieve all task
    router.get("/", task.findAll);

    // Retrieve all published task
    router.get("/completed", task.findAllPublished);

    // Retrieve current user tasks
    router.get("/user/tasks", [authJwt.verifyToken], task.currentUserTasks);


    // Retrieve a single Task with id
    router.get("/:id", task.findOne);

    // Update a Task with id
    router.put("/:id", task.update);

    // Delete a Task with id
    router.delete("/:id", task.delete);

    // Delete all task
    router.delete("/", task.deleteAll);

    app.use('/api/tasks', router);
};