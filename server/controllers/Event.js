const EventDB = require("./../models").Event;
const ProjectDB = require("../models").Project;
const UserDB = require("./../models").User;
const EventAllocationDB = require("./../models").EventAllocation;

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
  postEventAndAllocateOnIt: async (req, res) => {
    let departmentId = null;

    if (req.body.departmentId) departmentId = req.body.departmentId;
    else
      departmentId = await UserDB.findOne({
        where: {
          id: req.body.userId,
        },
      })
        .then((user) => {
          return user.departmentId;
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error" });
        });

    let eventId = await EventDB.create({
      name: req.body.name,
      projectId: req.body.projectId,
      description: req.body.description,
      label: req.body.label,
      departmentId: departmentId,
      startingDate: req.body.startingDate,
      endingDate: req.body.endingDate,
      type: req.body.type,
    })
      .then((event) => {
        return event.id;
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      });
    EventAllocationDB.create({
      userId: req.body.userId,
      eventId: eventId,
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
  getEventsOfSpecificDepartmentAndProject: async (req, res) => {
    const { departmentId, projectId, type } = req.params;
    const { Op } = require("@sequelize/core");

    if (projectId < 0) {
      res.status(400).send({ message: "Project doesn't exist" });
    }
    await EventDB.findAll({
      where: {
        projectId: projectId,
        departmentId: departmentId,
        type: type,
      },
      include: [{ model: ProjectDB, attributes: ["color", "name"] }],
      attributes: ["type", "name", "startingDate", "endingDate", "label", "id"],
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
  putEvent: async (req, res) => {
    await EventDB.update(
      {
        name: req.body.name,
        description: req.body.description,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate,
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
  deleteEvent: async (req, res) => {
    const { eventId } = req.params;
    await EventAllocationDB.destroy({
      where: {
        eventId: eventId,
      },
    })
      .then(() => {
        EventDB.destroy({
          where: {
            id: eventId,
          },
        })
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
  },
};

module.exports = controller;
