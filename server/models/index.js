const Sequelize = require("sequelize");
const db = require("./../config/db");

// get models

const UserModel = require("./User");
const ProjectModel = require("./Project");
const ProjectAllocationModel = require("./ProjectAllocation");
const DepartmentModel = require("./Department");
const EventModel = require("./Event");
const EventAllocationModel = require("./EventAllocation");
const CommentsModel = require("./Comments");

// create tables

const User = UserModel(db, Sequelize);
const Project = ProjectModel(db, Sequelize);
const ProjectAllocation = ProjectAllocationModel(db, Sequelize);
const Department = DepartmentModel(db, Sequelize);
const Event = EventModel(db, Sequelize);
const EventAllocation = EventAllocationModel(db, Sequelize);
const Comments = CommentsModel(db, Sequelize);

// relationships between tables

// user

Department.hasMany(User, {
  foreignKey: "departmentId",
  targetKey: "id",
});

User.belongsTo(Department, {
  foreignKey: "departmentId",
  targetKey: "id",
});

Comments.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

User.hasMany(Comments, {
  foreignKey: "userId",
  targetKey: "id",
});

Comments.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});

Event.hasMany(Comments, {
  foreignKey: "eventId",
  targetKey: "id",
});
// projectAllocation

User.hasMany(ProjectAllocation, {
  foreignKey: "userId",
  targetKey: "id",
});

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
Project.hasMany(Event, {
  foreignKey: "projectId",
  targetKey: "id",
});

Event.belongsTo(Department, {
  foreignKey: "departmentId",
  targetKey: "id",
});
Department.hasMany(Event, {
  foreignKey: "departmentId",
  targetKey: "id",
});

// event allocation

EventAllocation.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});
User.hasMany(EventAllocation, {
  foreignKey: "userId",
  targetKey: "id",
});

EventAllocation.belongsTo(Event, {
  foreignKey: "eventId",
  targetKey: "id",
});
Event.hasMany(EventAllocation, {
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
  Comments,
  connection: db,
};
