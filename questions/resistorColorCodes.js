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

    for (let i = 0; i < 3; i++) {
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
    answer += 'e' + colors[2] + " variance -> " + colors[3] + "%"
    return answer
}

function getWrongColorCode(correctColors) {
    let wrongColors = [];
    while (isEqualColors(wrongColors, correctColors)) {
        for (let i = 0; i < 3; i++) {
            wrongColors.push(Math.floor(Math.random() * colorCodes.length))
        }
        wrongColors.push(getVarianceColor())
    }
    return wrongColors
}

function isEqualColors(colors1, colors2) {
    for (let i = 0; i < colors1.length; i++ ) {
        if (colors1[i] !== colors2[i]) {
            return false;
        }
    }
    return true;
}

function generateResistor(correctColors) {
    varianceColor = ''
    if (correctColors[3] === 5) {
        varianceColor = "rgb(212,175,55)"
    } else if (correctColors[3] === 10) {
        varianceColor = "rgb(211,211,211)"
    } else {
        varianceColor = "rgb(237,187,144)"
    }
    return `
    <svg
       width="500px"
       height="500px"
       viewBox="0 0 297 210"
       version="1.1">
      <g
         transform="translate(0,-87)">
        <path
           style="fill:#f6b989;fill-opacity:1;stroke:#000000;stroke-width:1.01704812;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m 114.88024,170.18645 c 22.44649,-0.18561 44.62088,0.11798 66.93136,0.11377 18.60593,-0.003 18.69376,38.46289 0,38.56563 -22.23638,0.1222 -47.05866,-0.16851 -66.7101,0 -18.70398,0.16039 -22.993007,-38.49109 -0.22126,-38.6794 z"
           id="rect14" />
        <rect
           style="fill:${colorCodes[correctColors[0]]};fill-opacity:1;stroke:none;stroke-width:1.01109183;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           id="rect1"
           width="7.6196766"
           height="37.443398"
           x="114.88024"
           y="170.74956" />
        <rect
           y="170.69554"
           x="128.15588"
           height="37.604279"
           width="7.6196766"
           id="rect2"
           style="fill:${colorCodes[correctColors[1]]};fill-opacity:1;stroke:none;stroke-width:1.0132618;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <rect
           style="fill:${colorCodes[correctColors[2]]};fill-opacity:1;stroke:none;stroke-width:1.01271987;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           id="rect3"
           width="7.6196766"
           height="37.56406"
           x="141.21027"
           y="170.73576" />
        <rect
           y="170.81621"
           x="175.06314"
           height="37.48362"
           width="7.6196766"
           id="rect4"
           style="fill:${varianceColor};fill-opacity:1;stroke:none;stroke-width:1.01163495;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <rect
           style="fill:#dbe1e1;fill-opacity:1;stroke:#000000;stroke-width:0.42979875;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           id="rect832"
           width="68.172882"
           height="2.7561359"
           x="30.609556"
           y="187.29932" />
        <rect
           y="188.24426"
           x="196.16312"
           height="2.7561359"
           width="68.172882"
           id="rect850"
           style="fill:#dbe1e1;fill-opacity:1;stroke:#000000;stroke-width:0.42979875;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      </g>
    </svg>
    `
}

function generateQuestion() {
    let colors = getColorCode()
    let shuffledColors = getWrongColorCode(colors)
    console.log(colors)
    console.log(shuffledColors)
    let answer = "A"
    let a = colors
    let b = shuffledColors
    let resistor = generateResistor(colors)
    if (Math.random() > 0.5) {
        a = shuffledColors
        b = colors
        answer = "B"
    }

    return {
        question:
`<p>Choose the correct net resistance for the following resistor:</p>
${resistor}
<div>
${getAnswer(a)}
<input type="radio" name="answer" value="a">
</div>
<div>
${getAnswer(b)}
<input type="radio" name="answer" value="b">
</div>
`,
        answer
    }

}

module.exports = generateQuestion

console.log(generateQuestion())
