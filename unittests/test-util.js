const assert = require('assert');
const evaParser = require('../parser/evaParser.js');

function test(eva, code, expected){
    const exp = evaParser.parse(code);
    assert.strictEqual(eva.eval(exp), expected);
}

module.exports = {
    test,
  };