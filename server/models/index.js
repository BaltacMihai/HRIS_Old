const Sequelize = require("sequelize");
const db = require("./../config/db");

// get models

const UserModel = require("./User");
const ProjectModel = require("./Project");
const ProjectAllocationModel = require("./ProjectAllocation");
const DepartmentModel = require("./Department");
const EventModel = require("./Event");
const EventAllocationModel = require("./EventAllocation");

// create tables

const User = UserModel(db, Sequelize);
const Project = ProjectModel(db, Sequelize);
const ProjectAllocation = ProjectAllocationModel(db, Sequelize);
const Department = DepartmentModel(db, Sequelize);
const Event = EventModel(db, Sequelize);
const EventAllocation = EventAllocationModel(db, Sequelize);

// relationships between tables

// user

User.belongsTo(Department, {
  foreignKey: "departmentId",
  targetKey: "id",
});

// projectAllocation

ProjectAllocation.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

Project.hasMany(ProjectAllocation, {
  foreignKey: "projectId",
  targetKey: "id",
});
ProjectAllocation.belongsTo(Project, {
  foreignKey: "projectId",
  targetKey: "id",
});

// event
Event.belongsTo(Project, {
  foreignKey: "projectId",
  targetKey: "id",
});

Event.belongsTo(Department, {
  foreignKey: "departmentId",
  targetKey: "id",
});

// event allocation

EventAllocation.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

EventAllocation.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});

// export

module.exports = {
  User,
  Project,
  ProjectAllocation,
  Department,
  Event,
  EventAllocation,
  connection: db,
};
