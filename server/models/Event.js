module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Event", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("TASK", "MEETING"),
      allowNull: false,
    },
  });
};
