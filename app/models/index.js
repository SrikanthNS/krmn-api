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
  const dialectOptions = {};
  // Aiven and other cloud MySQL providers require SSL
  if (process.env.DB_SSL === "true") {
    dialectOptions.ssl = {
      require: true,
      rejectUnauthorized: false,
    };
  }

  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    dialectOptions,
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
db.featureFlag = require("../models/featureFlag.model.js")(
  sequelize,
  Sequelize,
);

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
  as: "owner",
  foreignKey: "userId",
  targetKey: "id",
});
db.task.belongsTo(db.client, {
  foreignKey: "clientId",
  targetKey: "id",
});
db.task.belongsTo(db.user, {
  as: "reviewer",
  foreignKey: "reviewerId",
  targetKey: "id",
});
db.task.belongsTo(db.user, {
  as: "assigner",
  foreignKey: "assignedBy",
  targetKey: "id",
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
