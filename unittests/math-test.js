const assert = require('assert');

module.exports = eva => {
    // Math Operations:
    assert.strictEqual(eva.eval(['+', 1, 5]), 6);
    assert.strictEqual(eva.eval(['/', 10, 5]), 2);
    assert.strictEqual(eva.eval(['+', ['+', 1, 4], 5]), 10);
    assert.strictEqual(eva.eval(['+', ['*', 3, 4], 5]), 17);
    assert.strictEqual(eva.eval(['-', ['*', 3, 4], ['*', 4, 17]]), -56);
    assert.strictEqual(eva.eval(['%', 17, 5]), 2);
};