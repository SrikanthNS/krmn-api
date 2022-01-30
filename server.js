const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");
require("dotenv").config();

const path = __dirname + '/app/views/';
const app = express();

app.use(express.static(path));


var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Client = db.client;


db.sequelize.sync({ force: false })
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     // initial();
// });

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });

    // Create User
    User.create({
        id: 1,
        username: 'kishore',
        email: 'kishore_ns@krmn.in',
        password: bcrypt.hashSync('qwerty', 8)
    }).then(user => {
        user.setRoles(2);
        user.setRoles(3);
    }).catch(error => console.log("error::", error.message));

    User.create({
        id: 2,
        username: 'manjunath',
        email: 'manjunath@krmn.in',
        password: bcrypt.hashSync('qwerty', 8)
    }).then(user => {
        user.setRoles(2);
        user.setRoles(3);
    }).catch(error => console.log("error::", error.message));

    User.create({
        id: 3,
        username: 'Srikanth',
        email: 'nssrikanth7@gmail.com',
        password: bcrypt.hashSync('qwerty', 8)
    }).then(user => {
        user.setRoles(2);
        user.setRoles(3);
    }).catch(error => console.log("error::", error.message));


    // create clients
    Client.create({
        id: 1,
        name: "Client 1"
    });

    Client.create({
        id: 2,
        name: "Client 2"
    });

    Client.create({
        id: 3,
        name: "Client 3"
    });
}
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Auth routes
require('./app/routes/auth.routes')(app);
// User routes
require('./app/routes/user.routes')(app);

// // Tutorial routes
// require("./app/routes/tutorial.routes")(app);
// Task routes
require("./app/routes/task.routes")(app);
// Client routes
require("./app/routes/client.routes")(app);


// Send index.html if no route Matches
app.get('*', function (req, res) {
    res.sendFile(path + "index.html", function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
