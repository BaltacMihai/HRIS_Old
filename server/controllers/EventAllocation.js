const EventAllocationDB = require("./../models").EventAllocation;
const EventDB = require("./../models").Event;
const ProjectDB = require("../models").Project;

const controller = {
  findEventsByIntervalAndUser: async (req, res) => {
    const { Op } = require("@sequelize/core");
    const { userId, startingDate, endingDate } = req.params;

    // if (startingDate < endingDate) {
    //   res
    //     .status(400)
    //     .send({ message: "Incorrect request", startingDate, endingDate });
    // }

    if (userId < 0) {
      res.status(400).send({ message: "User doesn't exist" });
    }

    EventAllocationDB.findAll({
      where: {
        userId: userId,
      },

      include: [
        {
          model: EventDB,
          attributes: ["type", "name", "endingDate"],
          where: {
            endingDate: {
              [Op.gt]: startingDate,
            },
            endingDate: {
              [Op.lt]: endingDate,
            },
          },
          include: [{ model: ProjectDB, attributes: ["color"] }],
        },
      ],
      attributes: ["eventId"],
    })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};

module.exports = controller;
