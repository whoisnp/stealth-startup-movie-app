const service = require("../config/services");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(service.DB.DB, service.DB.USER, service.DB.PASSWORD, {
  host: service.DB.HOST,
  dialect: service.DB.dialect,
  logging: false, // make it as true if the query logs are needed
  pool: {
    max: service.DB.pool.max,
    min: service.DB.pool.min,
    acquire: service.DB.pool.acquire,
    idle: service.DB.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.movie = require("./movies.model")(sequelize, Sequelize);

// User can have multiple movies so one to many relationship
db.user.hasMany(db.movie);
db.movie.belongsTo(db.user);




module.exports = db;



