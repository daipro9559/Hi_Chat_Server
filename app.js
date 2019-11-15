'use strict'
var express = require("express");
var app = express();
var http = require("http").createServer(app);
const CONFIG = require("./config/config")
var io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.json("hello world")
})

// count user connect  to room 
var userConnectToRoom; //  value test
const ROOM_INIT = "room_init" // listen 

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.broadcast.emit('hi');
    socket.on("disconnect", () => {
        console.log("user disconnect")
    })
    socket.on(ROOM_INIT, (room, callback) => {
        console.log('room: ' + room);
        // join room

        let roomSocket = io.sockets.adapter.rooms[room];
        if (roomSocket) {
            let currentCount = roomSocket.length
            if (currentCount < 2) {
                socket.join(room)
                callback({ isInit: false, isFull: false })
                return
            }
            callback({ isInit: false, isFull: true })
        } else {
            socket.join(room)
            callback({ isInit: true, isFull: false })
        }

    });
})

http.listen(CONFIG.PORT, () => {
    console.log("listening on :" + CONFIG.PORT)
})