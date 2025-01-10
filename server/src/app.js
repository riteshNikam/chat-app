import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-app-i9kb-git-main-riteshnikams-projects.vercel.app/",
    credentials: true,
  })
);

import { userRouter } from "./routes/user.routes.js";
import { messageRouter } from "./routes/message.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-i9kb-git-main-riteshnikams-projects.vercel.app/",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message); // io.emit will broadcast the event to all the connected sockets
  });
});

export { server };
