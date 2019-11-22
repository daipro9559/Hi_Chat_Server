'use strict'
var IceServer = require ('./model/iceServer')
const SOCKET_CONSTANTS = require('./util/constants')
var express = require("express");
var app = express();
var http = require("http").createServer(app);
const CONFIG = require("./config/config")
var io = require('socket.io')(http)

/*
map data of room:
format:{
    roomName:{
                sdp:data,
                iceCandidates:[]
            }
}
*/
var dataRooms = {}

app.get('/', (req, res) => {
    res.json("hello world")
})

// count user connect  to room 
var userConnectToRoom; //  value test
var iceServer1 = new IceServer('stun:[2404:6800:4008:c02::7f]:19302', ["stun:[2404:6800:4008:c02::7f]:19302"], "", "", "")
var iceServer2 = new IceServer("stun:[2404:6800:4008:c06::7f]:19302", ["stun:[2404:6800:4008:c06::7f]:19302"], "", "", "")
var iceServer3 = new IceServer("turn:[2404:6800:4008:c02::7f]:19305?transport=tcp",
    ["turn:[2404:6800:4008:c02::7f]:19305?transport=tcp"],
    "CN/b3+4FEgbSO1cY5DIYzc/s6OMTIICjBQ", "OclB8wswXlVn5xBHVIUyjDq97/U=", "")
const iceServers = [iceServer1, iceServer2, iceServer3]

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.broadcast.emit('hi');
    socket.on("disconnect", () => {
        console.log("user disconnect")
    })
    socket.on(SOCKET_CONSTANTS.ROOM_INIT, (room, callback) => {
        console.log('room: ' + room);
        // join room

        let roomSocket = io.sockets.adapter.rooms[room];
        if (roomSocket) {
            let currentCount = roomSocket.length
            if (currentCount < 2) {
                socket.join(room)
                callback({ isInit: false, isFull: false , iceServers: iceServers, dataRooms:dataRooms[room]})
                return
            }
            callback({ isInit: false, isFull: true})
        } else {
            socket.join(room)
            callback({ isInit: true, isFull: false, iceServers: iceServers})
            // create data save in room
            dataRooms[room] = {}
            dataRooms[room].iceCandidates=[]
        }

    });
    socket.on(SOCKET_CONSTANTS.SDP_EVENT, (room,data)=>{
        console.log('data: ' + data);
        let sdp = JSON.parse(data)
        if(sdp.type === "OFFER"){
            dataRooms[room].sdp = data
        }else{
            socket.to(room).emit(SOCKET_CONSTANTS.SDP_EVENT, data)
        }
    })
    socket.on(SOCKET_CONSTANTS.ICE_CANDIDATE_EVENT, (room, data) =>{
        console.log('data: ' + data);
        let roomSocket = io.sockets.adapter.rooms[room];
        if(roomSocket.length == 1){
            dataRooms[room].iceCandidates.push(data)
        }else{
            socket.to(room).emit(SOCKET_CONSTANTS.ICE_CANDIDATE_EVENT, data)
        }
    })
})

http.listen(CONFIG.PORT, () => {
    console.log("listening on :" + CONFIG.PORT)
})