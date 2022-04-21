const Sequelize = require("sequelize");
const ProjectDB = require("../models").Project;
const ProjectAllocationDB = require("./../models").ProjectAllocation;
const UserDB = require("./../models").User;
const DepartmentDB = require("./../models").Department;

// VERY IMPORTANT: We can see the project only where there is at least one connection

//#TODO: Find a way to skip the project that has the userId = id
const controller = {
  findProjectsWhereUserIsntEnrolled: async (req, res) => {
    const { Op, Sequelize } = require("@sequelize/core");
    const { id } = req.params;

    console.log(id);
    if (id < 0) {
      res.status(400).send({ message: "User doesn't exist" });
    }

    ProjectDB.findAll({
      attributes: ["id", "color", "name", "startingDate", "endingDate"],

      include: [
        {
          model: ProjectAllocationDB,
          where: {
            userId: {
              [Op.ne]: id,
            },
          },
          attributes: [],
        },
      ],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  findProjectsWhereUserIsEnrolled: async (req, res) => {
    const { Op, Sequelize } = require("@sequelize/core");
    const { id } = req.params;

    console.log(id);
    if (id < 0) {
      res.status(400).send({ message: "User doesn't exist" });
    }

    ProjectDB.findAll({
      attributes: ["id", "color", "name", "startingDate", "endingDate"],

      include: [
        {
          model: ProjectAllocationDB,
          where: {
            userId: id,
          },
          attributes: [],
        },
      ],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  findProjects: async (req, res) => {
    const { projectId } = req.params;

    ProjectDB.findOne({
      attributes: [
        "id",
        "color",
        "name",
        "startingDate",
        "endingDate",
        "description",
      ],
      where: {
        id: projectId,
      },
    })
      .then((project) => {
        ProjectAllocationDB.findOne({
          where: {
            projectId: projectId,
            type: "PROJECT_MANAGER",
          },
        })
          .then((pjAllocation) => {
            UserDB.findOne({
              where: {
                id: pjAllocation.userId,
              },
            })
              .then((user) => {
                res.status(200).send({
                  name: project.name,
                  description: project.description,
                  color: project.color,
                  startingDate: project.startingDate,
                  endingDate: project.endingDate,
                  projectManag: user.name,
                });
              })
              .catch((error) => {
                console.log(error);
                res.status(200).send({
                  name: project.name,
                  description: project.description,
                  color: project.color,
                  startingDate: project.startingDate,
                  endingDate: project.endingDate,
                  projectManag: "None",
                });
              });
          })
          .catch((error) => {
            console.log(error);
            res.status(200).send({
              name: project.name,
              description: project.description,
              color: project.color,
              startingDate: project.startingDate,
              endingDate: project.endingDate,
              projectManag: "None",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  findProjectsDepartments: async (req, res) => {
    const { projectId } = req.params;
    await ProjectAllocationDB.findAll({
      where: {
        projectId: projectId,
        type: "TEAM_LEAD",
      },
      include: [
        {
          model: UserDB,

          attributes: ["name"],
          include: [
            {
              model: DepartmentDB,

              attributes: ["id", "icon", "name"],
            },
          ],
        },
      ],
      attributes: [],
    })
      .then((event) => {
        res.status(200).send(event);
      })

      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  postProject: async (req, res) => {
    ProjectDB.create({
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      startingDate: req.body.startingDate,
      endingDate: req.body.endingDate,
    })
      .then((project) => {
        ProjectAllocationDB.create({
          projectId: project.id,
          userId: req.body.userId,
          type: "CEO",
        })
          .then((pjAllocation) => {
            res.status(200).send(pjAllocation);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send({ message: "Server error" });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};

module.exports = controller;
