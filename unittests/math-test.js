const assert = require('assert');

module.exports = eva => {
    // Math Operations:
    assert.strictEqual(eva.eval(['+', 1, 5]), 6);
    assert.strictEqual(eva.eval(['+', ['+', 3, 2], 5]), 10);
    assert.strictEqual(eva.eval(['+', ['*', 3, 2], 5]), 11);

    console.log('Math test:             All assertions passed');
};