const Sequelize = require("sequelize");

const sequelize = new Sequelize("hris", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamp: "true",
  },
});

module.exports = sequelize;
