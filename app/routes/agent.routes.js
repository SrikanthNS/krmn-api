const { authJwt } = require("../middleware");
const agent = require("../controllers/agent.controller");

module.exports = function agentRoutes(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  // Chat with the AI agent
  app.post("/api/agent/chat", [authJwt.verifyToken], agent.chat);

  // Get available agent tools/capabilities
  app.get("/api/agent/tools", [authJwt.verifyToken], agent.getTools);
};
