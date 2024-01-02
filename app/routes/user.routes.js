const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", user.allAccess);
  app.get("/api/all", user.allAccess);
  app.get("/api/reviewer", user.findAllReviewers);
  app.get("/api/userList", user.findAllUsers);
  // Retrieve a single User with id
  app.get("/api/users/:id", [authJwt.verifyToken], user.findOne);
  // Update a Client with id
  app.put("/api/users/:id", [authJwt.verifyToken], user.update);

  app.get("/api/user", [authJwt.verifyToken], user.userBoard);

  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    user.moderatorBoard
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    user.adminBoard
  );
};
