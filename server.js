// importing express
const express = require('express');

// importing http 
const http = require('http');

// importing socket.io
const { Server } = require("socket.io");//destructuring socket.io &import socket.io

// importing socket.io
// const socketIoObj = require("socket.io");//import socket.io
// const { Server } = socketIoObj;//destructuring socket.io



const app = express();//now the app is expressServer
const PORT = 8888;

// to use socket we need http to be integrated with my app that is expressServer
// we are integrating http & express server
const server = http.createServer(app);//now server is my new server

// my io is instance of server given to me by Socket.io
const io = new Server(server);

// connection established means frontend is accessing backend
io.on('connection',(socket) => {
    // we are catching the event that is getting emitted in ui
    socket.on('this is event name',(data)=>{//echo 123 is name of the event
        io.emit('this is event name',data);
    })
    // so the io is unique & is associated with my server 
    // & sockets are multiple & are associated with frontend
    console.log(socket.id);
});
// app.use(middleware);
// using middleware i will send
// my public folder to browser
// the same way live sends
app.use(express.static('public'));
// express.static is a internal method of
// express used to send static html files
//  in a folder

server.listen(PORT,() => {
    console.log(`server is up & running on http://localhost:${PORT}/`);
});

