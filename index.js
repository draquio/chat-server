import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import { createClient } from "@libsql/client";
import { Server } from "socket.io";
import { createServer } from "node:http";


dotenv.config();

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const db = createClient({
  url: process.env.DB_url,
  authToken: process.env.DB_token
});
await db.execute(`
  CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
  )
`)

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
