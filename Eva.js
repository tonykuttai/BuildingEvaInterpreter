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
        // Comparison Operations:
        if (exp[0] === '>') {
            return this.eval(exp[1], env) > this.eval(exp[2], env);
        }
        if (exp[0] === '>=') {
            return this.eval(exp[1], env) >= this.eval(exp[2], env);
        }
        if (exp[0] === '<') {
            return this.eval(exp[1], env) < this.eval(exp[2], env);
        }
        if (exp[0] === '<=') {
            return this.eval(exp[1], env) <= this.eval(exp[2], env);
        }

        // #######################################################################
        // MATH Operations:
        if (exp[0] === '+') {
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }

        if (exp[0] === '*') {
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }

        if (exp[0] === '-') {
            return this.eval(exp[1], env) - this.eval(exp[2], env);
        }

        if (exp[0] === '/') {
            return this.eval(exp[1], env) / this.eval(exp[2], env);
        }

        if (exp[0] === '%') {
            return this.eval(exp[1], env) % this.eval(exp[2], env);
        }

        // #######################################################################
        // Block: Sequence of expressions
        if (exp[0] === 'begin') {
            const blockEnv = new Environment({}, env);
            return this._evalBlock(exp, blockEnv);
        }

        // #######################################################################
        // Variable decalration: (var foo 10)
        if (exp[0] === 'var') {
            const [_, name, value] = exp;
            return env.define(name, this.eval(value, env));
        }

        // #######################################################################
        // Variable Access: foo
        if (isVariableName(exp)) {
            return env.lookup(exp);
        }

        // #######################################################################
        // Variable set: (set foo 10)
        if (exp[0] === 'set') {
            const [_, name, value] = exp;
            return env.assign(name, this.eval(value, env));
        }

        // #######################################################################
        // if condition:
        if (exp[0] === 'if') {
            const [_tag, condition, consequent, alternative] = exp;
            if (this.eval(condition, env)) {
                return this.eval(consequent, env);
            }
            return this.eval(alternative, run);
        }

        // #######################################################################
        // while condition:
        if (exp[0] === 'while') {
            const [_tag, condition, body] = exp;
            let result;
            while (this.eval(condition, env)) {
                result = this.eval(body, env);
            }
            return result;
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