const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("../public"));

const colors = ["purple", "green", "red", "yellow", "orange", "cyan"];

io.on("connection", socket => {
  let user = null;

  socket.on("join", username => {
    const color = username === "BINTV"
      ? "gold"
      : colors[Math.floor(Math.random() * colors.length)];

    user = { username, color };

    io.emit("system", `${username} joined the chat`);
  });

  socket.on("message", msg => {
    if (!user) return;

    io.emit("message", {
      username: user.username,
      color: user.color,
      text: msg
    });
  });

  socket.on("disconnect", () => {
    if (user) {
      io.emit("system", `${user.username} left the chat`);
    }
  });
});

server.listen(3000, () => {
  console.log("BINTV Chat running on port 3000");
});
