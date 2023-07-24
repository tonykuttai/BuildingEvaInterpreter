// self-eval-test.js
const assert = require('assert');

module.exports = eva => {
    console.log('Self Eval test: Start');
    // Self-evaluating expressions:
    assert.strictEqual(eva.eval(1), 1);
    assert.strictEqual(eva.eval('"hello"'), 'hello');

    console.log('Self Eval test: Passed');
};