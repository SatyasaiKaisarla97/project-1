const { Sequelize, Model } = require("sequelize");
const sequelize = require("../util/database");

const Book = sequelize.define("book", {
  title: Sequelize.STRING,
  isTaken: Sequelize.BOOLEAN,
  takenTime: Sequelize.DATE,
  returnTime: Sequelize.DATE,
  fine: Sequelize.FLOAT,
});

module.exports = Book;
