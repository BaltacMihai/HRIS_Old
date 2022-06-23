const Sequelize = require("sequelize");
const { Department } = require("./../models");

const DepartmentDB = require("./../models").Department;
const EventDB = require("./../models").Event;
const UserDB = require("./../models").User;

const controller = {
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
};

module.exports = controller;
