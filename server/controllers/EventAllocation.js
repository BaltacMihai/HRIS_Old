const EventAllocationDB = require("./../models").EventAllocation;
const EventDB = require("./../models").Event;
const ProjectDB = require("../models").Project;
const UserDB = require("./../models").User;

const controller = {
  findEventsById: async (req, res) => {
    const { eventId } = req.params;

    if (eventId < 0) {
      res.status(400).send({ message: "Event doesn't exist" });
    }

    EventAllocationDB.findAll({
      where: {
        eventId: eventId,
      },
      attributes: [],
      include: [
        {
          model: UserDB,
          attributes: ["id", "photo", "name"],
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
  findEventsByIntervalAndUser: async (req, res) => {
    const { Op } = require("@sequelize/core");
    const { userId, startingDate, endingDate } = req.params;

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
            [Op.and]: [
              {
                endingDate: {
                  [Op.gt]: startingDate,
                },
              },
              {
                endingDate: {
                  [Op.lt]: endingDate,
                },
              },
            ],
          },
          include: [{ model: ProjectDB, attributes: ["color"] }],
        },
      ],
      attributes: ["eventId"],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  findSpecificEventsByIntervalAndUser: async (req, res) => {
    const { Op } = require("@sequelize/core");
    const { userId, startingDate, endingDate, type } = req.params;

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
          attributes: ["type", "name", "startingDate", "endingDate", "label"],
          where: {
            [Op.and]: [
              {
                endingDate: {
                  [Op.gt]: startingDate,
                },
              },
              {
                endingDate: {
                  [Op.lt]: endingDate,
                },
              },
              {
                type: {
                  [Op.eq]: type,
                },
              },
            ],
          },
          include: [{ model: ProjectDB, attributes: ["color", "name"] }],
        },
      ],
      attributes: ["eventId"],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  findAllBySpecificEvent: async (req, res) => {
    const { Op } = require("@sequelize/core");
    const { type } = req.params;

    EventAllocationDB.findAll({
      include: [
        {
          model: EventDB,
          attributes: ["type", "name", "startingDate", "endingDate", "label"],
          where: {
            type: {
              [Op.eq]: type,
            },
          },
          include: [{ model: ProjectDB, attributes: ["color", "name"] }],
        },
      ],
      attributes: ["eventId"],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  postFreeDay: async (req, res) => {
    EventDB.create({
      name: "Off day",
      projectId: 0,
      description: "Free day",
      departmentId: req.body.departmentId,
      startingDate: req.body.startingDate,
      endingDate: req.body.endingDate,
      type: "FREE_DAY",
      label: "FREE_DAY",
    })
      .then((event) => {
        EventAllocationDB.create({
          userId: req.body.userId,
          eventId: event.id,
        })
          .then((event) => {
            UserDB.findOne({
              where: {
                id: req.body.userId,
              },
            })
              .then((event) => {
                UserDB.update(
                  {
                    daysOff: event.daysOff - 1,
                  },
                  {
                    where: {
                      id: req.body.userId,
                    },
                  }
                )
                  .then((event) => {
                    res.status(200).send(event);
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
  findFreeDays: async (req, res) => {
    EventAllocationDB.findAll({
      attributes: ["id"],
      include: [
        {
          model: UserDB,
          attributes: ["username", "id"],
        },
        {
          model: EventDB,
          attributes: ["startingDate", "id"],
          where: {
            type: "FREE_DAY",
          },
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

  post: async (req, res) => {
    EventAllocationDB.create({
      userId: req.body.userId,
      eventId: req.body.eventId,
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
    EventAllocationDB.create({
      userId: userId,
      eventId: req.body.eventId,
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
    const { eventId, userId } = req.params;
    EventAllocationDB.destroy({
      where: {
        eventId: eventId,
        userId: userId,
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
  deleteFreeDay: async (req, res) => {
    const { eventId, userId, eventAllocationId } = req.params;
    EventAllocationDB.destroy({
      where: {
        id: eventAllocationId,
      },
    })
      .then((event) => {
        EventDB.destroy({
          where: {
            id: eventId,
          },
        })
          .then((event) => {
            UserDB.findOne({
              where: {
                id: userId,
              },
            })
              .then((user) => {
                UserDB.update(
                  {
                    daysOff: user.daysOff + 1,
                  },
                  {
                    where: {
                      id: userId,
                    },
                  }
                )
                  .then((event) => {
                    res.status(200).send(event.toString());
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
