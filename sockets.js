const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = 3000
const teams = {
    red: "red",
    blue: "blue"
}

// let's us access client files easily
app.use(express.static('public'))

server.listen(port);
console.log("Listening on localhost:" + port)

/*
  Server->Client WebSockets Schema is
  TODO: Fill this in
*/

// when we get a new connection – `socket` represents the user that's connected
io.on('connection', function(socket) {
    // maybe convert this to a weighted random based on the # of team members currently present
    socket.team = (Math.random() > 0.5) ? teams.red : teams.blue

    // send this user 'hello'
    socket.emit('hello', {team: socket.team});

    // when the user sends 'world' back, we console log
    socket.on('world', function(data) {
        console.log("This user responded with", data)
    });
});