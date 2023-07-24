const assert = require('assert');
const {test} = require('./test-util');

module.exports = eva => {
    // Maeva,th Operations:
    test(eva,`(+ 1 5)`,6);
    test(eva,`(+ (+ 2 3) 5)`, 10);
    test(eva,`(+ (* 2 3) 5)`, 11);

    // Comparison
    test(eva,`(> 1 5)`, false);
    test(eva,`(< 1 5)`, true);

    console.log('built-in-function test:All assertions passed');
};