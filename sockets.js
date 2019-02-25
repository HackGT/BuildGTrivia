const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const generator = require('./questionGenerator')

const port = 3000
const teams = {
    white: "white",
    blue: "blue"
}
const teamScores = {}
for (var key in teams) {
    teamScores[teams[key]] = 0
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
    socket.team = (Math.random() > 0.5) ? teams.white : teams.blue
    socket.hasQuestion = false
    socket.answer = null

    // send this user 'hello'
    socket.emit('hello', {team: socket.team});

    socket.emit('scoreUpdate', teamScores)

    socket.on('question', function(data) {
        if (socket.hasQuestion) {
            return
        }
        socket.hasQuestion = true
        var question = generator()
        socket.answer = question.answer

        socket.emit('question', question.question)
    })

    socket.on('answer', function(data) {
        if (!socket.hasQuestion) {
            return
        }
        socket.hasQuestion = false
        // console.log(socket.answer, data)
        var result = socket.answer.toLowerCase() == data.toLowerCase()
        socket.emit('result', result)

        if (result) {
            teamScores[socket.team] += 1

            io.emit('scoreUpdate', teamScores)
        }
    })
});
