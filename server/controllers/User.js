const DepartmentDB = require("./../models").Department;

const EventAllocationDB = require("./../models").EventAllocation;
const EventDB = require("./../models").Event;

const UserDB = require("./../models").User;

const controller = {
  findById: async (req, res) => {
    const { userId } = req.params;
    if (userId < 0) {
      res.status(400).send({ message: "User doesn't exist" });
    }
    UserDB.findAll({
      where: {
        id: userId,
      },
    })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  login: async (req, res) => {
    const { username, password } = req.params;

    UserDB.findOne({
      where: {
        username: username,
        password: password,
      },
    })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },

  put: async (req, res) => {
    UserDB.update(
      {
        email: req.body.email,
        facebook: req.body.facebook,
        photo: req.body.photo,
        phone: req.body.phone,
        daysOff: req.body.daysOff,
      },
      {
        where: {
          id: req.body.id,
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
  },
  getAll: async (req, res) => {
    UserDB.findAll({
      attributes: ["id", "photo", "name", "specialRights"],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getAllDepartment: async (req, res) => {
    const { departmentId } = req.params;
    UserDB.findAll({
      attributes: ["id", "photo", "name", "specialRights"],
      where: {
        departmentId: departmentId,
      },
      include: [
        {
          model: DepartmentDB,
          attributes: ["name"],
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
  getStats: async (req, res) => {
    const { Op } = require("sequelize");
    const { userId } = req.params;
    UserDB.findOne({
      attributes: [],
      include: [
        {
          model: EventAllocationDB,
          attributes: ["eventId"],
          include: [
            {
              model: EventDB,
              attributes: ["type"],
            },
          ],
        },
      ],
      where: {
        id: {
          [Op.eq]: userId,
        },
      },
    })
      .then((event) => {
        event.dataValues = event.dataValues.EventAllocations?.map((e) => {
          return e.dataValues.Event.dataValues.type;
        });

        let noOfTasks = 0;
        let noOfMeetings = 0;

        event.dataValues.forEach((e) => {
          if (e == "TASK") noOfTasks++;
          if (e == "MEETING") noOfMeetings++;
        });

        console.log(noOfTasks, noOfMeetings);
        event.dataValues.forEach((e) => {});
        event.dataValues.Task = noOfTasks;
        event.dataValues.Meeting = noOfMeetings;

        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
  getStatsLastMonth: async (req, res) => {
    const { Op } = require("sequelize");

    const lastMonth = new Date(new Date().setDate(new Date().getDate() - 31));

    const { userId } = req.params;
    UserDB.findOne({
      attributes: [],

      include: [
        {
          model: EventAllocationDB,
          attributes: ["eventId"],
          include: [
            {
              model: EventDB,
              attributes: ["type", "endingDate"],
            },
          ],
        },
      ],
      where: {
        id: {
          [Op.eq]: userId,
        },
      },
    })
      .then((event) => {
        event.dataValues = event.dataValues.EventAllocations?.map((e) => {
          if (e.dataValues.Event.dataValues > lastMonth)
            return e.dataValues.Event.dataValues.type;
        });

        let noOfTasks = 0;
        let noOfMeetings = 0;

        event.dataValues.forEach((e) => {
          if (e == "TASK") noOfTasks++;
          if (e == "MEETING") noOfMeetings++;
        });

        console.log(noOfTasks, noOfMeetings);
        event.dataValues.forEach((e) => {});
        event.dataValues.Task = noOfTasks;
        event.dataValues.Meeting = noOfMeetings;

        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },
};

module.exports = controller;
