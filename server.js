const express = require("express");
const path = require("path");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = 8000;

const users = {};

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("New ID created: " + socket.id);

  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send-message", (msg) => {
    console.log(socket.id + " " + msg);
    socket.broadcast.emit("receive", { message: msg, name: users[socket.id] });
  });

  socket.on("disconnect", (disconnect) => {
    socket.broadcast.emit("user-disconnected", { name: users[socket.id] });
    console.log(disconnect + " | ID: " + socket.id + " | " + users[socket.id]);
  });
});
http.listen(PORT);
