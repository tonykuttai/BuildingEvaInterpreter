/**
 * Eva Interpreter
 */
const Environment = require('./Environment');
class Eva {
    /**
     * Creates an Eva instance with the global environment
     */
    constructor(global = GlobalEnvironment) {
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
        if (this._isNumber(exp)) {
            return exp;
        }
        if (this._isString(exp)) {
            // Remove the leading and trailing quotes: ' " '
            return exp.slice(1, -1);
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
        if (this._isVariableName(exp)) {
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
            return this.eval(alternative, env);
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

        // #######################################################################
        // Function declaration
        // (def square (x) (* x x))
        // Syntactic sugar for: (var square (lambda (x) (* x x)))
        if (exp[0] === 'def') {
            const [_tag, name, params, body] = exp;
            // const fn = {
            //     params,
            //     body,
            //     env, // Closure
            // };
            // return env.define(name, fn);

            // JIT-transpile to a variable declaration
            const varExp = ['var', name, ['lambda', params, body]];
            return this.eval(varExp, env);
        }

        // #######################################################################
        // Lambda function
        // (lambda (x) (* x x))
        if(exp[0] === 'lambda'){
            const [_tag, params, body] = exp;
            return {
                params,
                body,
                env, // Closure
            };
        }


        // #######################################################################
        // Function calls:
        // (print "Hello World")
        // (+ x 5)
        // (> foo bar)
        if (Array.isArray(exp)) {
            const fn = this.eval(exp[0], env);
            const args = exp.slice(1).map(arg => this.eval(arg, env));

            // 1. Native function:
            if (typeof fn === 'function') {
                return fn(...args);
            }

            // 2. User defined functions
            const activationRecord = {};
            fn.params.forEach((param,index) => {
                activationRecord[param] = args[index];
            });
            const activationEnv = new Environment(
                activationRecord,
                fn.env,
            );

            return this._evalBody(fn.body, activationEnv);
        }

        throw `Unimplemented: ${JSON.stringify(exp)}`;
    }

    _evalBody(body, env){
        if(body[0] === 'begin'){
            return this._evalBlock(body, env);
        }
        return this.eval(body, env);
    }

    _evalBlock(block, env) {
        let result;
        const [_tag, ...expressions] = block;
        expressions.forEach(exp => {
            result = this.eval(exp, env);
        });
        return result;
    }
    _isNumber(exp) {
        return typeof exp === 'number';
    }

    _isString(exp) {
        return typeof exp == 'string' && exp[0] === '"' && exp.slice(-1) === '"';
    }

    _isVariableName(exp) {
        return typeof exp === 'string' && /^[+\-*/<>=a-zA-Z0-9_]+$/.test(exp);
    }
}

/**
 * Default Global Environment
 */
const GlobalEnvironment = new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1',
    '+'(op1, op2) {
        return op1 + op2;
    },
    '-'(op1, op2 = null) {
        if (op2 == null) {
            return -op1;
        }
        return op1 - op2;
    },
    '*'(op1, op2) {
        return op1 * op2;
    },
    '/'(op1, op2) {
        return op1 / op2;
    },
    '%'(op1, op2) {
        return op1 % op2;
    },
    //comparison
    '>'(op1, op2) {
        return op1 > op2;
    },
    '<'(op1, op2) {
        return op1 < op2;
    },
    '>='(op1, op2) {
        return op1 >= op2;
    },
    '<='(op1, op2) {
        return op1 <= op2;
    },
    '='(op1, op2) {
        return op1 == op2;
    },
    //console output
    print(...args) {
        console.log(...args);
    }
});

module.exports = Eva;