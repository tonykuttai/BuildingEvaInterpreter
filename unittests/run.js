const Eva = require('../Eva');
const Environment = require('../Environment');

const tests = [
    require('./self-eval-test.js'),
    require('./math-test.js'),
    require('./variables-test.js'),
    require('./block-test.js'),
    require('./if-test.js'),
    require('./while-test.js'),
    require('./built-in-function-test.js'),
    require('./user-defined-function-test.js'),
    require('./lambda-function-test.js'),
];

const eva = new Eva();

console.log('########## TESTING EVA ##########');
tests.forEach(test => test(eva));

console.log("Print test: Start");
eva.eval(['print', '"Hello"', '"World!"']);
console.log('Print test: Passed');

console.log('########## TESTS PASSED #########');


