/**
 * Eva Interpreter
 */
const Environment = require('./Environment');
class Eva {
    /**
     * Creates an Eva instance with the global environment
     */
    constructor(global = new Environment()) {
        this.global = global;
    }
    /**
     * Evaluates an expression in the given environment
     * @param {*} exp 
     * @param {*} env 
     * @returns 
     */
    eval(exp, env = this.global) {

        // #######################################################################
        // Self-evaluating expressions:
        if (isNumber(exp)) {
            return exp;
        }
        if (isString(exp)) {
            // Remove the leading and trailing quotes: ' " '
            return exp.slice(1, -1);
        }

        // #######################################################################
        // MATH Operations:
        if (exp[0] === '+') {
            return this.eval(exp[1]) + this.eval(exp[2]);
        }

        if (exp[0] === '*') {
            return this.eval(exp[1]) * this.eval(exp[2]);
        }

        if (exp[0] === '-') {
            return this.eval(exp[1]) - this.eval(exp[2]);
        }

        if (exp[0] === '/') {
            return this.eval(exp[1]) / this.eval(exp[2]);
        }

        if (exp[0] === '%') {
            return this.eval(exp[1]) % this.eval(exp[2]);
        }

        // #######################################################################
        // Block: Sequence of expressions
        if (exp[0] === 'begin') {
            return this._evalBlock(exp, env);
        }

        // #######################################################################
        // Variable decalration: (var foo 10)
        if (exp[0] === 'var') {
            const [_, name, value] = exp;
            return env.define(name, this.eval(value));
        }

        // #######################################################################
        // Variable Access: foo
        if (isVariableName(exp)) {
            return env.lookup(exp);
        }
        throw `Unimplemented: ${JSON.stringify(exp)}`;
    }

    _evalBlock(block, env) {
        let result;
        const [_tag, ...expressions] = block;
        expressions.forEach(exp => {
            result = this.eval(exp, env);
        });
        return result;
    }
}

function isNumber(exp) {
    return typeof exp === 'number';
}

function isString(exp) {
    return typeof exp == 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}

module.exports = Eva;