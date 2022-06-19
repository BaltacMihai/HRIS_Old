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
          [Op.and]: [{ [Op.ne]: "PROJECT_MANAGER" }, { [Op.ne]: "CEO" }],
        },
      },
      include: [
        {
          model: UserDB,

          attributes: ["name", "photo", "id"],
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

  postByUsername: async (req, res) => {
    let userId = await UserDB.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        return user.id;
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
    ProjectAllocationDB.create({
      userId: userId,
      projectId: req.body.projectId,
      type: req.body.type,
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  delete: async (req, res) => {
    let projectAllocationList = null;

    await ProjectAllocationDB.findAll({
      where: {
        projectId: req.body.projectId,
        userId: req.body.userId,
      },

      attributes: ["id", "createdAt"],
      order: [["createdAt", "DESC"]],
    })
      .then((event) => {
        projectAllocationList = event;
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });

    await ProjectAllocationDB.destroy({
      where: {
        projectId: req.body.projectId,
        userId: req.body.userId,
        id: projectAllocationList[0].id,
      },
    })
      .then((event) => {
        res.status(200).send(event.toString());
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  deleteDepartment: async (req, res) => {
    let departmentUsers;
    const { Op } = require("@sequelize/core");

    await UserDB.findAll({
      where: {
        departmentId: req.body.departmentId,
      },
      attributes: ["id"],
    })
      .then((event) => {
        departmentUsers = event;
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });

    departmentUsers = departmentUsers.map((row) => {
      return row.dataValues.id;
    });

    console.log("---------");
    console.log(departmentUsers);
    console.log("---------");

    await ProjectAllocationDB.destroy({
      where: {
        projectId: req.body.projectId,
        userId: {
          [Op.in]: departmentUsers,
        },
      },
    })
      .then((event) => {
        res.status(200).send(event.toString());
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};

module.exports = controller;
