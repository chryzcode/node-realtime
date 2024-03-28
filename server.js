import "dotenv/config";
import express from "express";
import path from "path";
import url from "url";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

//run when client connect

io.on("connection", socket => {
  console.log("New WS connection...");

  // to the client that just joined
  socket.emit("message", "Welcome!");

  //broadcast when a user connects to everyone except the newly joined client
  socket.broadcast.emit("message", "A user just joined the chat");
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
