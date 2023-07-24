const assert = require('assert');

/**
 * (if <condition>
 *     <consequent>
 *     <alternate>)
 */
module.exports = eva => {
    console.log('If test: Start');
    assert.strictEqual(eva.eval(
        ['begin',

            ['var', 'x', 10],
            ['var', 'y', 0],

            ['if', ['<=', 'x', 10],
                ['set', 'y', 20],
                ['set', 'y', 30],
            ],

            'y'

        ]),

        20);

    console.log('If test: Passed');
};