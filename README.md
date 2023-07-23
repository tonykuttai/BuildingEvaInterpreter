# BuildingEvaInterpreter
Building an Interpreter for the Language Eva in Javascript


## Dependencies

    - syntax-cli
        Install it from npm
```bash
sudo npm install -g syntax-cli
syntax-cli --help
```

## Reference 
### Use Syntax-cli to test the grammar

```bash
syntax-cli --grammar parser/eva-grammer.bnf --mode LALR1 --parse '42'
syntax-cli --grammar parser/eva-grammer.bnf --mode LALR1 --parse '42' --tokenize
syntax-cli --grammar parser/eva-grammer.bnf --mode LALR1 --parse '(+ 5 foo)'
```

### Generate the eva Parser
```bash
syntax-cli --grammar parser/eva-grammer.bnf --mode LALR1 --output parser/evaParser.js
```

