const EventDB = require("./../models").Event;
const ProjectDB = require("../models").Project;

const controller = {
  postEvent: async (req, res) => {
    EventDB.create({
      name: req.body.name,
      projectId: req.body.projectId,
      description: req.body.description,
      departmentId: req.body.departmentId,
      startingDate: req.body.startingDate,
      endingDate: req.body.endingDate,
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
  getEvent: async (req, res) => {
    const { type, eventId } = req.params;

    if (eventId < 0) {
      res.status(400).send({ message: "Project doesn't exist" });
    }
    await EventDB.findOne({
      where: {
        id: eventId,
        type: type,
      },
      include: [{ model: ProjectDB, attributes: ["color", "name"] }],
    })
      .then((event) => {
        res.status(200).send(event);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
  },

  putEventLabel: async (req, res) => {
    await EventDB.update(
      {
        label: req.body.label,
      },
      {
        where: {
          id: req.body.id,
          type: req.body.type,
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
};

module.exports = controller;
