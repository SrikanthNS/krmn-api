const { authJwt } = require("../middleware");
const analytics = require("../controllers/analytics.controller");

module.exports = function analyticsRoutes(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  // All analytics endpoints require JWT + Admin or above role
  const adminGuard = [authJwt.verifyToken, authJwt.isAdminOrAbove];

  app.get("/api/analytics/company", adminGuard, analytics.companyPerformance);
  app.get("/api/analytics/staff", adminGuard, analytics.staffPerformance);
  app.get("/api/analytics/client", adminGuard, analytics.clientDelivery);
};
