const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    price: Sequelize.DOUBLE,
    author: Sequelize.STRING,
    year: Sequelize.INTEGER,
  },
  { paranoid: true }
);

module.exports = Product;
