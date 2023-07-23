// test.js
const assert = require('assert');
const Eva = require('./Eva');
const Environment = require('./Environment');

// Tests
const eva = new Eva(new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1'
}));

// Self-evaluating expressions:
assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"hello"'), 'hello');

// Math Operations:
assert.strictEqual(eva.eval(['+', 1, 5]), 6);
assert.strictEqual(eva.eval(['/', 10, 5]), 2);
assert.strictEqual(eva.eval(['+', ['+', 1, 4], 5]), 10);
assert.strictEqual(eva.eval(['+', ['*', 3, 4], 5]), 17);
assert.strictEqual(eva.eval(['-', ['*', 3, 4], ['*', 4, 17]]), -56);
assert.strictEqual(eva.eval(['%', 17, 5]), 2);

// Variables: declaration
assert.strictEqual(eva.eval(['var', 'x', 10]), 10);

// Variables: Access
assert.strictEqual(eva.eval('x'), 10);

assert.strictEqual(eva.eval(['var', 'y', 100]), 100);
assert.strictEqual(eva.eval('y'), 100);

assert.strictEqual(eva.eval('VERSION'), '0.1');

// var isUser = true;
assert.strictEqual(eva.eval(['var', 'isUser', 'true']), true);

assert.strictEqual(eva.eval(['var', 'z', ['*', 3, 5]]), 15);

// Blocks:
assert.strictEqual(eva.eval(
    ['begin',
        ['var', 'x', 10],
        ['var', 'y', 20],
        ['+', ['*', 'x', 'y'], 30],
    ]), 
230);

// Blocks with nested scopes
assert.strictEqual(eva.eval(
    ['begin',
        ['var', 'x', 10],
        ['begin',
            ['var', 'x', 20],            
            'x'
        ],
        'x'
    ]), 
10);

// Blocks with nested scopes
assert.strictEqual(eva.eval(
    ['begin',
        ['var', 'value', 10],
        ['var', 'result', ['begin',
            ['var', 'x', ['+', 'value', 10]],            
            'x'
        ]],
        'result'
    ]), 
20);

// Blocks with set inside inner block
assert.strictEqual(eva.eval(
    ['begin',
        ['var', 'data', 10],
        ['begin',
            ['set', 'data', 100],
        ],
        'data'
    ]), 
100);

console.log('All assertions passed');