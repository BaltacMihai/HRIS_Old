const ProjectDB = require("../models").Project;
const ProjectAllocationDB = require("./../models").ProjectAllocation;

// VERY IMPORTANT: We can see the project only where there is at least one connection
const controller = {
  findProjectsWhereUserIsntEnrolled: async (req, res) => {
    const { Op } = require("@sequelize/core");
    const { id } = req.params;

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
};

module.exports = controller;
