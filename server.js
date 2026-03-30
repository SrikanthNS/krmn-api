const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

// CORS – allow the configured origin or same-origin in production
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || true,
};
app.use(cors(corsOptions));

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

db.sequelize.sync({ force: false });
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
require("./app/routes/auth.routes")(app);
// User routes
require("./app/routes/user.routes")(app);
// Task routes
require("./app/routes/task.routes")(app);
// Client routes
require("./app/routes/client.routes")(app);

// Send index.html for any non-API route (React SPA)
app.get("*", function (req, res) {
  res.sendFile(viewsPath + "index.html", function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 6868;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
