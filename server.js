const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//run when client connects
io.on("connection", (socket) => {
    socket.emit("message", "Welcome bro");

    //broadcast to all the users
    socket.broadcast.emit("message", "A user has joined the chat");

    //disconnects
    socket.on("disconnect", () => {
        io.emit("message", "a user has left");
    });

    //listen
    socket.on("chatmessage", (msg) => {
        io.emit("message", msg);
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log("Hey server Activated on " + PORT);
});
