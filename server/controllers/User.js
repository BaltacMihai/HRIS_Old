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
};

module.exports = controller;
