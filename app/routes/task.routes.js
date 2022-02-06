const { authJwt } = require("../middleware");

module.exports = app => {
    const task = require("../controllers/task.controller.js");
    const excel = require("../controllers/excel.controller");

    var router = require("express").Router();

    // Create a new Task
    router.post("/", [authJwt.verifyToken], task.create);

    // Retrieve all task
    router.get("/", [authJwt.verifyToken], task.findAll);

    // Download all tasks
    router.get("/download", [authJwt.verifyToken], excel.download);

    // Retrieve all published task
    router.get("/completed", [authJwt.verifyToken], task.findAllPublished);

    // Retrieve current user tasks
    router.get("/user/tasks", [authJwt.verifyToken], task.currentUserTasks);

    // Retrieve a single Task with id
    router.get("/:id", [authJwt.verifyToken], task.findOne);

    // Update a Task with id
    router.put("/:id", [authJwt.verifyToken], task.update);

    // Delete a Task with id
    router.delete("/:id", [authJwt.verifyToken], task.delete);

    // Delete all task
    router.delete("/", [authJwt.verifyToken], task.deleteAll);

    app.use('/api/tasks', router);
};