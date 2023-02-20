const Joi = require("joi");
const authRouter = require("./auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,

  { useNewUrlParser: true },
  () => console.log("connected to db")
);
const express = require("express");
const app = express();

let rooms = [
  {
    id: 1,
    name: "room1"
  },
  { id: 2, name: "room2" },
  { id: 3, name: "room3" }
];

//to get all rooms
app.get("/api/rooms", (req, res) => {
  res.send(rooms);
});
// to add a room
app.post("/api/rooms", (req, res) => {
  const { error } = validateRoom(req.body);
  if (error) {
    res.status(400).send(error);
  }

  const room = {
    id: rooms.length + 1,
    name: req.body
  };
  rooms.push(room);

  res.send(room);
});

//to get a specific room
app.get("/api/rooms/:roomid", (req, res) => {
  let room = rooms.find(c => c.id === parseInt(req.params.roomid));
  if (!room) res.status(404).send("the room with the given id was not found");
  res.send(room);
});
app.put("/api/rooms/:roomid", (req, res) => {
  let room = rooms.find(c => c.id === parseInt(req.params.roomid));
  if (!room) res.status(404).send("the room with the given id was not found");

  const { error } = validateRoom(req.body);
  if (error) {
    res.status(400).send("room is required");
  }
  room.name = req.body.name;
  res.send(room);
});

function validateRoom(room) {
  schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(room, schema);
}
app.delete("/api/rooms/:roomid", (req, res) => {
  let room = rooms.find(c => c.id === parseInt(req.params.roomid));
  if (!room) res.status(404).send("the room with the given id was not found");

  const index = rooms.indexOf(room);
  rooms.splice(index, 1);

  res.send(room);
});
app.use(express.json());

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`running on port ${port}......`));
