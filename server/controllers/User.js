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
};

module.exports = controller;
