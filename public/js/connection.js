var team = undefined
var teamElement = document.getElementById('team')

// we might want to consider making subfiles on the client,
// where one is solely for socket connections
var socket = io()

/*
  Client->Server WebSockets Schema is
  TODO: Fill this in
*/

// when we get a message with the tag "hello" from the server
socket.on('hello', function(data) {
  console.log("Server said hello!", data)
  socket.emit('world', {someData: "apple"});
  team = data.team
  teamElement.textContent = "You are on " + team + " team!"
  teamElement.classList.add(team)
})