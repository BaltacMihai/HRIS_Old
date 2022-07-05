const Sequelize = require("sequelize");
const { Department } = require("./../models");

const DepartmentDB = require("./../models").Department;
const EventDB = require("./../models").Event;
const UserDB = require("./../models").User;
const ProjectAllocationDB = require("./../models").ProjectAllocation;
const ProjectDB = require("./../models").Project;

const controller = {
  getName: async (req, res) => {
    const { departmentId } = req.params;

    await DepartmentDB.findOne({
      attributes: ["name"],

      where: {
        id: departmentId,
      },
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getStats: async (req, res) => {
    const { Op } = require("sequelize");

    await DepartmentDB.findAll({
      attributes: ["name", "icon", "id"],
      include: [
        {
          model: UserDB,
          attributes: ["name"],
        },
        {
          model: EventDB,
          attributes: ["type"],
        },
      ],
      where: {
        id: {
          [Op.ne]: 0,
        },
      },
    })
      .then((event) => {
        event = event?.map((e) => {
          e.dataValues.Users = e.dataValues.Users.length;
          e.dataValues.Tasks = e.dataValues.Events.filter(
            (word) => word.type == "TASK"
          ).length;

          e.dataValues.Meeting = e.dataValues.Events.filter(
            (word) => word.type == "MEETING"
          ).length;

          e.dataValues.Events = undefined;

          //e.dataValues.Events = e.dataValues.Events.length;
          return e;
        });
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getCurrentStats: async (req, res) => {
    const { Op } = require("sequelize");
    const { departmentId } = req.params;

    await DepartmentDB.findAll({
      attributes: ["name", "icon", "id"],
      include: [
        {
          model: UserDB,
          attributes: ["name", "id"],
          include: [
            {
              model: ProjectAllocationDB,
              attributes: ["projectId"],
              include: [
                {
                  model: ProjectDB,
                  attributes: ["name", "color", "id"],
                },
              ],
            },
          ],
        },
        {
          model: EventDB,
          attributes: ["type"],
        },
      ],
      where: {
        id: {
          [Op.eq]: departmentId,
        },
      },
    })
      .then((event) => {
        event = event?.map((e) => {
          e.dataValues.Projects = e.dataValues.Users?.map((e) => {
            return e.ProjectAllocations?.map((projectAlloc) => {
              return {
                name: projectAlloc.dataValues.Project.name,
                color: projectAlloc.dataValues.Project.color,
                id: projectAlloc.dataValues.Project.id,
              };
            });
          });

          let projects = new Map();

          e.dataValues.Projects?.map((firstElem) => {
            firstElem?.map((secondEle) => {
              projects.set(secondEle.id, {
                id: secondEle.id,
                color: secondEle.color,
                name: secondEle.name,
              });
            });
          });

          e.dataValues.noProjects = projects.size;
          console.log(projects.values());
          e.dataValues.Projects = Array.from(projects.values());

          let noUsers = 0;
          e.dataValues.User = e.dataValues.Users?.map((e) => {
            noUsers++;
            return { name: e.dataValues.name, id: e.dataValues.id };
          });
          e.dataValues.noUsers = noUsers;

          e.dataValues.Tasks = e.dataValues.Events.filter(
            (word) => word.type == "TASK"
          ).length;

          e.dataValues.Meeting = e.dataValues.Events.filter(
            (word) => word.type == "MEETING"
          ).length;

          e.dataValues.Events = undefined;
          e.dataValues.Users = undefined;

          return e;
        });
        res.status(200).send(event[0]);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  create: async (req, res) => {
    DepartmentDB.create({
      name: req.body.name,
      icon: req.body.icon,
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};

module.exports = controller;
