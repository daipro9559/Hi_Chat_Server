'use strict'
var express = require("express");
var app = express();
var http = require("http").createServer(app);
const CONFIG = require("./config/config")
var io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.json("hello world")
})

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.broadcast.emit('hi');
    socket.on("disconnect", ()=>{
        console.log("user disconnect")
    })
    socket.on('send_message', function(msg){
        console.log('message: ' + msg);
        io.emit('reply_message', 'hello');
      });
})

http.listen(CONFIG.PORT, () => {
    console.log("listening on :" + process.env.PORT)
})