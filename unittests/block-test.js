const assert = require('assert');
const testUtil = require('./test-util');

module.exports = eva => {
    console.log('Block test: Start');
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

    testUtil.test(eva,
        `
        (begin
            (var x 10)
            (var y 20)
            (+ (* x 10) y)
        )
        `,
    120);

    console.log('Block test: Passed');
};