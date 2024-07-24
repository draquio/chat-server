import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from 'cors'

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors:{
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
});
app.listen(3000, () => "Funcionando");

let connectedUsers = {};
io.on("connection", (socket) => {
  console.log("A user has coneected!");

  socket.on("login", (username) => {
    connectedUsers[socket.id] = username;
    io.emit("users updated", Object.values(connectedUsers));
  });

  socket.on("disconnect", () => {
    console.log("An user has disconnected");
    delete connectedUsers[socket.id];
    io.emit("users updated", Object.values(connectedUsers));
  });

  socket.on("message",  (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

app.use(cors());
app.use(logger("dev"));
app.get('/ping', (req, res) => {
  res.send('on')
})
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
