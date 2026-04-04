const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
var bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled for SPA serving
  }),
);

// CORS – allow the configured origin; restrict in production
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_ORIGIN || false
      : true,
};
app.use(cors(corsOptions));

// Rate limiting on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per window
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Serve the React build from app/views
const viewsPath = __dirname + "/app/views/";
app.use(express.static(viewsPath));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Client = db.client;
const FeatureFlag = db.featureFlag;

db.sequelize.sync({ force: false }).then(() => {
  // Seed feature flags if they don't exist
  FeatureFlag.findOrCreate({
    where: { key: "user_preferences" },
    defaults: {
      key: "user_preferences",
      enabled: false,
      description: "Allow users to set preferences like items per page",
    },
  });
});
// db.sequelize.sync({ force: false, alter: true  }).then(() => {
//   console.log("DB alter Done.");
// });

// Think before you enable below code snippet
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
// });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  // Create User
  User.create({
    id: 1,
    username: "kishore",
    email: "kishore_ns@krmn.in",
    password: bcrypt.hashSync("qwerty", 8),
  })
    .then((user) => {
      user.setRoles(2);
      user.setRoles(3);
    })
    .catch((error) => console.log("error::", error.message));

  User.create({
    id: 2,
    username: "manjunath",
    email: "manjunath@krmn.in",
    password: bcrypt.hashSync("qwerty", 8),
  })
    .then((user) => {
      user.setRoles(2);
      user.setRoles(3);
    })
    .catch((error) => console.log("error::", error.message));

  User.create({
    id: 3,
    username: "Srikanth",
    email: "nssrikanth7@gmail.com",
    password: bcrypt.hashSync("qwerty", 8),
  })
    .then((user) => {
      user.setRoles(2);
      user.setRoles(3);
    })
    .catch((error) => console.log("error::", error.message));

  // create clients
  Client.create({
    id: 1,
    name: "Client 1",
  });

  Client.create({
    id: 2,
    name: "Client 2",
  });

  Client.create({
    id: 3,
    name: "Client 3",
  });
}

// Auth routes
require("./app/routes/auth.routes")(app, authLimiter);
// User routes
require("./app/routes/user.routes")(app);
// Task routes
require("./app/routes/task.routes")(app);
// Client routes
require("./app/routes/client.routes")(app);
// Feature flag routes
require("./app/routes/featureFlag.routes")(app);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Send index.html for any non-API route (React SPA)
app.get("*", function (req, res) {
  res.sendFile(viewsPath + "index.html", function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 6868;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    db.sequelize.close().then(() => process.exit(0));
  });
  setTimeout(() => process.exit(1), 10000);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
