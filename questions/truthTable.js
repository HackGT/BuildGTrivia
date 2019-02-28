var allSymbols = ['c', 'b', 'a']
var operators = ['AND', 'XOR', 'OR']
var jsOperators = ['&&', '^', '||']
var negator = 'NOT'

// EQ -> MULTISYMBOL-A OPERATOR MULTISYMBOL-B <OPERATOR MULTISYMBOL-C>
// MULTISYMBOL-X -> X | NOT (X) | (MULTISYMBOL-X OPERATOR MULTISYMBOL-!X)

function generateEquation(numSymbols) {
    // numSymbols = Math.max(numSymbols || 2, 2)
    // table multichar support for now
    numSymbols = 2;

    var alphabetList = shuffle(allSymbols.slice(allSymbols.length - numSymbols))
    var alphabet = new Set(alphabetList)
    var seenAlphabet = new Set()

    var output = ""

    alphabetList.forEach(function(char, i) {
        output += cfg('$multisymbol-' + char, alphabet, seenAlphabet) + ' '
        if (i != alphabet.size - 1) {
            output += cfg('$operator', alphabet, seenAlphabet) + ' '
        }
    })

    return output.replace(/  +/g, " ")

}

function cfg(currentSymbol, alphabet, seenAlphabet) {
    if (currentSymbol.indexOf('$multisymbol') > -1) {
        var char = currentSymbol.charAt(currentSymbol.length - 1)
        seenAlphabet = new Set(seenAlphabet)
        seenAlphabet.add(char)

        var allowableStates = (alphabet.size > seenAlphabet.size) ? 3 : 2

        var nextState = parseInt(Math.random() * allowableStates)
        if (nextState == 0) {
            return char + ' '
        } else if (nextState == 1) {
            return '(<span class="not">' + char + '</span>) '
        } else {
            // alphabet - seenAlphabet = set of remaining chars we can use
            let difference = new Set(
                [...alphabet].filter(x => !seenAlphabet.has(x)));

            var bonusChar = [...difference][parseInt(Math.random() * difference.size)]

            if (bonusChar == undefined) {
                return char + ' '
            } else {
                seenAlphabet.add(bonusChar)
            }



            return '(' + cfg(currentSymbol, alphabet, seenAlphabet)
                + cfg('$operator', alphabet, seenAlphabet)
                + cfg('$multisymbol-' + bonusChar, alphabet, seenAlphabet) + ') '
        }
    } else if (currentSymbol.indexOf('$operator') > -1) {
        return operators[parseInt(Math.random() * operators.length)] + ' '
    }
}

function buildTruthTable(expression, phony) {
    phony = phony === undefined ? false : phony

    var jsExpression = expression.replace(/<span class="not">/g, "!")
    jsExpression = jsExpression.replace(/<\/span>/g, "")
    for (var i = 0; i < operators.length; i++) {
        jsExpression = jsExpression.replace(RegExp(operators[i], "g"), jsOperators[i])
    }

    var alphabetSize = expression.indexOf('c') == -1 ? 2 : 3
    var truthTable = {}

    var definiteWrongA = parseInt(Math.random() * 2)
    var definiteWrongB = parseInt(Math.random() * 2)

    for (var a = 0; a < 2; a++) {
        for (var b = 0; b < 2; b++) {
            var realAnswer = eval(jsExpression)
            if (phony && ((definiteWrongA == a && definiteWrongB == b) || Math.random() > 0.75)) {
                realAnswer = Math.abs(1 - realAnswer)
            }
            truthTable[a + "," + b] = realAnswer ? 1 : 0
        }
    }

    return truthTable
}

function truthTableToHTML(truthTable) {
    return `
<table>
    <thead>
        <tr>
            <td></td>
            <td>a = 0</td>
            <td>a = 1</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>b = 0</td>
            <td>${truthTable["0,0"]}</td>
            <td>${truthTable["1,0"]}</td>
        </tr>
        <tr>
            <td>b = 1</td>
            <td>${truthTable["0,1"]}</td>
            <td>${truthTable["1,1"]}</td>
        </tr>
    </tbody>
</table>`
}

function generateQuestion() {
    var equation = generateEquation()
    var correctTable = buildTruthTable(equation)
    var fakeTable = buildTruthTable(equation, true)
    var answer = "A"
    var a = correctTable
    var b = fakeTable
    if (Math.random() > 0.5) {
        a = fakeTable
        b = correctTable
        answer = "B"
    }

    return {
        question:
`<p class="question">Pick the correct truth table for the following equation: <div class="question"><b>${equation}</b></div></p>
<div class="ttable">
<input type="radio" name="answer" value="a" id="answer-a">
<label for="answer-a" class="answer-label"></label>
${truthTableToHTML(a)}
</div>
<div class="ttable">
<input type="radio" name="answer" value="b" id="answer-b">
<label for="answer-b" class="answer-label"></label>
${truthTableToHTML(b)}
</div>
`,
        answer
    }
}

// shuffle code from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = generateQuestion
