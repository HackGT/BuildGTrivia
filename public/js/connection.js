var team = undefined
var teamElement = document.getElementById('team')
var questionElement = document.getElementById('question')
var submit = document.getElementById('submit')
var toastDiv = document.getElementById('toast')

// we might want to consider making subfiles on the client,
// where one is solely for socket connections
var socket = io()
var hasQuestion = false
/*
  Client->Server WebSockets Schema is
  TODO: Fill this in
*/

// when we get a message with the tag "hello" from the server
socket.on('hello', function(data) {
  team = data.team
  teamElement.textContent = "You are on " + team + " team!"
  teamElement.classList.add(team)
  socket.emit('question')
})

socket.on('question', function(data) {
  questionElement.innerHTML = data
})

socket.on('result', function(data) {
  if (data === true) {
    // toast("You got it right!", 0, true)
    successFlash()
  } else {
    // toast("Wrong answer!", 0, true)
    failFlash()
  }
  socket.emit('question')
})

socket.on('scoreUpdate', function(data) {
  for (var key in data) {
    document.getElementById(key).textContent = data[key]
  }
})

submit.onclick = function() {
  var radio = document.getElementsByTagName('input')
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      var answer = radio[i].value
      socket.emit('answer', answer)
    }
  }
}

function successFlash() {
  bgFlash("#b8e994")
}

function failFlash() {
  bgFlash("#ff7979")
}

function bgFlash(color, max) {

  max = max || 3
  

  document.body.style.backgroundColor = color
  
  var i = 0
  var interval = setInterval(function() {
    document.body.style.backgroundColor = i % 2 == 1 ? color : ""
    i += 1

    if (i == max) {
      clearInterval(interval)
      document.body.style.backgroundColor = ""
    }
  }, 125)
}

function toast(message, delay, clear) {
  delay = delay || 3 * 1000
  clear = clear || false

  if (clear) {
    toastDiv.innerHTML = ""
  }

  var messageElement = document.createElement('p')
  messageElement.textContent = message
  toastDiv.appendChild(messageElement)
  setTimeout(function() {
    messageElement.remove()
  }, delay)
}