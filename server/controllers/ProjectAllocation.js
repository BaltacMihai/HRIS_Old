const ProjectAllocationDB = require("./../models").ProjectAllocation;
const ProjectDB = require("../models").Project;
const UserDB = require("./../models").User;
const DepartmentDB = require("./../models").Department;

const controller = {
  findUsersProjects: async (req, res) => {
    const { Op } = require("@sequelize/core");
    const { userId } = req.params;

    if (userId < 0) {
      res.status(400).send({ message: "User doesn't exist" });
    }

    ProjectAllocationDB.findAll({
      where: {
        userId: userId,
      },

      include: [
        {
          model: ProjectDB,
          attributes: ["id", "color", "name", "startingDate", "endingDate"],
        },
      ],

      attributes: ["type"],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  findDepartmentProject: async (req, res) => {
    const { Op } = require("@sequelize/core");
    const { projectId, departmentId } = req.params;

    await ProjectAllocationDB.findAll({
      where: {
        projectId: projectId,
        type: {
          [Op.ne]: "PROJECT_MANAGER",
        },
      },
      include: [
        {
          model: UserDB,

          attributes: ["name", "photo"],
          where: {
            departmentId: departmentId,
          },
          include: [
            {
              model: DepartmentDB,

              attributes: ["name"],
            },
          ],
        },
      ],
      attributes: ["type"],
      order: [["type", "DESC"]],
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
