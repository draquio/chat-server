import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});


io.on("connection", async (socket) => {
  console.log("A user has coneected!");

  socket.on("disconnect", () => {
    console.log("An user has disconnected");
  });

  socket.on("message", async (msg) => {
    socket.broadcast.emit("message", msg);
  });
});


app.use(logger("dev"));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
