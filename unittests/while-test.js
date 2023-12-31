const assert = require('assert');

/**
 * (while <condition>
 *        <statement>
 *                  )
 */
module.exports = eva => {
    console.log('While test: Start');
    assert.strictEqual(eva.eval(
        ['begin',

            ['var', 'counter', 0],
            ['var', 'result', 0],

            ['while', ['<', 'counter', 10],
                // result++
                // Todo: implement ['++], <Exp>]
                ['begin',
                    ['set', 'result', ['+', 'result', 1]],
                    ['set', 'counter', ['+', 'counter', 1]],
                ]
            ],
            'result'
        ]),

    10);

    console.log('While test: Passed');

};