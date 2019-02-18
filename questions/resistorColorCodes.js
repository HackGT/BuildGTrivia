// resistors have three main bands, with one band for variance


// the program must generate 4 random colors, get a correct answer, and then get a wrong answer


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

// choose three random colors from colorCodes
// choose one color from variance

function getColorCode() {
    let colors = [];

    for (let i = 0; i < 3; i++ ) {
        colors.push(Math.floor(Math.random() * colorCodes.length))
    }

    colors.push(getVarianceColor())
    console.log(colors)
    return colors
}

function getVarianceColor() {
    let varianceIndex = Math.floor(Math.random() * Object.keys(varianceCodes).length)
    let varianceColors = Object.keys(varianceCodes)
    let variance = varianceCodes[varianceColors[varianceIndex]]
    return variance
}

// compute the answer
// compute an incorrect answer also
getColorCode()

// interface for question and answer
