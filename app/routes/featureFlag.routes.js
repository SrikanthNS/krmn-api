const { authJwt } = require("../middleware");
const featureFlag = require("../controllers/featureFlag.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  // Get all feature flags (any authenticated user)
  app.get("/api/feature-flags", [authJwt.verifyToken], featureFlag.findAll);

  // Toggle a feature flag (admin only)
  app.put(
    "/api/feature-flags/:key",
    [authJwt.verifyToken, authJwt.isAdmin],
    featureFlag.toggle,
  );
};
