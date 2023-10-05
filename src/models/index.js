const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.plan = require("./plan.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize, db.plan);
db.template = require("./template.model.js")(sequelize, Sequelize);
db.friend = require("./friend.model.js")(sequelize, Sequelize, db.user);
db.card = require("./card.model.js")(sequelize, Sequelize, db.user, db.template);
db.cardInvitees = require("./cardInvitees.model.js")(sequelize, Sequelize, db.card);
module.exports = db;