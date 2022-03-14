module.exports = (sequelize, DataTypes) => {
  return sequelize.define("ProjectAllocation", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("EMPLOYEE", "TEAM_LEAD", "PROJECT_MANAGER", "CEO"),
      allowNull: false,
    },
  });
};
