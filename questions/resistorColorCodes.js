let colorCodes = [
   "black",
   "brown",
   "red",
   "orange",
   "yellow",
   "green",
   "blue",
   "violet",
   "grey",
   "white"
]

let varianceCodes = {
    "gold": 5,
    "silver": 10,
    "": 0
}

function getColorCode() {
    let colors = [];

    for (let i = 0; i < 3; i++ ) {
        colors.push(Math.floor(Math.random() * colorCodes.length))
    }

    colors.push(getVarianceColor())
    return colors
}

function getVarianceColor() {
    let varianceIndex = Math.floor(Math.random() * Object.keys(varianceCodes).length)
    let varianceColors = Object.keys(varianceCodes)
    let variance = varianceCodes[varianceColors[varianceIndex]]
    return variance
}

function getAnswer(colors) {
    let answer = ''

    for (let i = 0; i < 2; i++) {
        answer += colors[i]
    }
    answer += 'e' + colors[2]+ " variance -> " + colors[3] + "%"
    return answer
}

function shuffleColors(colors) {
    let randomIndex = ''
    let temp = 0
    for (let i = 0; i < colors.length; i++) {
        randomIndex = Math.floor(Math.random() * colors.length)
        temp = colors[i]
        colors[i] = colors[randomIndex]
        colors[randomIndex] = temp
    }
    return colors
}

function generateResponses() {
    let colors = getColorCode()
    console.log(colors)
    let correctAnswer = getAnswer(colors)
    let incorrectAnswer = getAnswer(shuffleColors(colors))
    console.log(correctAnswer)
    console.log(incorrectAnswer)
}

generateResponses()
