var truthTable = require('./questions/truthTable')
var resistorColorCodes = require('./questions/resistorColorCodes')

var questionGenerators = [truthTable, resistorColorCodes]

module.exports = function() {
    var questionGenerator = questionGenerators[parseInt(Math.random() * questionGenerators.length)]
    return questionGenerator()
}
