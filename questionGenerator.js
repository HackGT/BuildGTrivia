var truthTable = require('./questions/truthTable')

var questionGenerators = [truthTable]

module.exports = function() {
    var questionGenerator = questionGenerators[parseInt(Math.random() * questionGenerators.length)]
    return questionGenerator()
}