const express = require("express");
const connection = require("./models").connection;
const router = require("./routes");
var cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

let PORT = 3031;

app.use("/api", router);

//reset Route
app.get("/reset", (req, res) => {
  connection
    .sync({ force: true })
    .then(() => {
      res.status(201).send({ message: "Database reset" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Database reset failed" });
    });
});

app.use("/*", (req, res) => {
  res.status(200).send({ message: "App is working" });
});

app.listen(PORT, () => {
  console.log("The server work on port " + PORT);
});
