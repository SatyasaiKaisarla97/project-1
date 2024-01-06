const Sequelize = require("sequelize");

const sequelize = new Sequelize("library", "root", "Satyasaik123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
