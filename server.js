import "dotenv/config";
import express from "express";
import path from "path";
import url from "url";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { formatMessage } from "./utils/messages.js";
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from "./utils/users.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const botName = "The App Bot";

//run when client connect

io.on("connection", socket => {
  socket.on("joinRoom", (username, room) => {
    // Welcome the current user
    socket.emit("message", formatMessage(botName, "Welcome!"));

    //broadcast when a user connects to everyone except the newly joined client
    socket.broadcast.emit("message", formatMessage(botName, "A user has joined the chat"));
  });

  socket.on("chatMessage", msg => {
    io.emit("message", formatMessage("USER", msg));
  });

  //Runs when the client disconnects
  socket.on("disconnect", () => {
    // to everyone chat room
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });
});

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
