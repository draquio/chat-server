import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

const port = process.env.PORT ?? 3000;
const isProd = process.env.NODE_ENV === "production";
// Comma-separated list of allowed origins, or "*"/undefined to reflect any.
// `true` refleja el origen de la peticion, lo cual SI es compatible con
// credentials (a diferencia del comodin "*", que no lo es).
const corsOrigin =
  process.env.CORS_ORIGIN === undefined || process.env.CORS_ORIGIN === "*"
    ? true
    : process.env.CORS_ORIGIN.split(",").map((o) => o.trim());

const app = express();
const server = createServer(app);

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(logger(isProd ? "combined" : "dev"));
app.get("/ping", (req, res) => res.send("on"));

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user has connected!");

  socket.on("login", (username) => {
    if (typeof username !== "string" || !username.trim()) return;
    connectedUsers.set(socket.id, username.trim());
    io.emit("users updated", [...connectedUsers.values()]);
  });

  socket.on("message", (msg) => {
    // El cliente envia un objeto { content, user, time, avatar, color }
    if (!msg || typeof msg !== "object" || !String(msg.content ?? "").trim()) {
      return;
    }
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
    connectedUsers.delete(socket.id);
    io.emit("users updated", [...connectedUsers.values()]);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("CORS allowed origins:", corsOrigin);
});