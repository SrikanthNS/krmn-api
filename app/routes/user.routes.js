const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  app.get("/api/users", [authJwt.verifyToken], user.allAccess);
  app.get("/api/all", user.allAccess);
  app.get("/api/reviewer", [authJwt.verifyToken], user.findAllReviewers);
  app.get("/api/userList", [authJwt.verifyToken], user.findAllUsers);
  // Update user preferences (must be before :id routes)
  app.put(
    "/api/users/preferences",
    [authJwt.verifyToken],
    user.updatePreferences,
  );
  // Retrieve a single User with id
  app.get("/api/users/:id", [authJwt.verifyToken], user.findOne);
  // Update a User with id
  app.put("/api/users/:id", [authJwt.verifyToken], user.update);
  // Soft delete (deactivate) a User
  app.put(
    "/api/users/:id/deactivate",
    [authJwt.verifyToken, authJwt.isAdmin],
    user.deactivate,
  );
  // Reactivate a User
  app.put(
    "/api/users/:id/activate",
    [authJwt.verifyToken, authJwt.isAdmin],
    user.activate,
  );

  app.get("/api/user", [authJwt.verifyToken], user.userBoard);

  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    user.moderatorBoard,
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    user.adminBoard,
  );
};
