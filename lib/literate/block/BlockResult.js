const {consoleSymbols} = require('./BlockSandbox');
const util = require('util');
const {BlockImage} = require('./BlockImage');

const inspect = obj => {
    if(typeof obj === "string") return obj;
    return util.inspect(obj);
};

module.exports.BlockResult = class BlockResult {
    console = [];
    args = [];
    plot = [];
    error = false;

    constructor({args, globalContext, error = false}) {
        this.args = args;
        this.error = error;

        if(globalContext){
            this.console = globalContext.console[consoleSymbols.output];
        }
    }

    toMarkdown() {
        const md = [
            ...this.console,
            ...this.args.filter(_ => _ !== undefined)
        ];

        const handler = obj => {
            if(Array.isArray(obj))
                return obj.map(handler).join(' ');

            if(obj.toMarkdown)
                return obj.toMarkdown();

            return inspect(obj);
        };

        return ['\n', ...md.map(handler)].join('\n');
    }
};