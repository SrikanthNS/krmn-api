const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Support Heroku JawsDB / ClearDB connection string, or individual env vars
const connectionUrl =
  process.env.JAWSDB_URL ||
  process.env.CLEARDB_DATABASE_URL ||
  process.env.DATABASE_URL;

let sequelize;
if (connectionUrl) {
  sequelize = new Sequelize(connectionUrl, {
    dialect: "mysql",
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  });
} else {
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.userRoles = require("../models/userRole.model.js")(sequelize, Sequelize);
db.task = require("../models/task.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(
  sequelize,
  Sequelize,
);
db.client = require("../models/client.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: db.userRoles,
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: db.userRoles,
  foreignKey: "userId",
  otherKey: "roleId",
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});

db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

db.task.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
db.task.belongsTo(db.client, {
  foreignKey: "clientId",
  targetKey: "id",
});
db.task.belongsTo(db.user, {
  foreignKey: "reviewerId",
  targetKey: "id",
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
