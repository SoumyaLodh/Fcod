const express = require("express");
const path = require("path");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 8000

const users = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function FetchAPI(search){
  const response = await fetch(`https://api.apilayer.com/google_search?q=${search}`, {
    method: "GET",
    headers: {
      "apikey": process.env.API_KEY
    }
  })
  const res2 = response.json()
  console.log(res2)
  return res2;
}

app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname +"/app.html");
});

io.on("connection", (socket) => {
  console.log("New ID created: " + socket.id);

  socket.on("new-user-joined", (name) => {
    console.log(name);
    users[socket.id] = name;
    console.log(users);
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send-message", (msg) => {
    console.log(socket.id + " " + msg);
    
    if(msg.startsWith("!search ")) {
      console.log(msg)
      const qtext = msg.replace("!search ", "").replace(" ", "+")
      console.log(qtext)
      FetchAPI(qtext).then((res => socket.emit("receive", { message: msg, name: users[socket.id], consoleLog: res})))
      
    }else{
      console.log(socket.id + " receive: " + msg);
      socket.broadcast.emit("receive", { message: msg, name: users[socket.id], consoleLog: null});
    }
  });

  socket.on("disconnect", (disconnect) => {
    socket.broadcast.emit("user-disconnected", { name: users[socket.id] });
    console.log(disconnect + " | ID: " + socket.id + " | " + users[socket.id]);
    users[socket.id] = null
    delete users[socket.id]
  });
});

http.listen(PORT);
