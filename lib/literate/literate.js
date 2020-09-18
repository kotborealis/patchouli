const codeBlocks = require('gfm-code-blocks');
const vm = require('vm');
const {parseLang} = require('./parseLang');
const {BlockResult} = require('./block/BlockResult');
const {ConsoleSymbols} = require('./block/BlockConsole');
const {BlockSandbox} = require('./block/BlockSandbox');
const {wrapCode} = require('./wrapCode');
const debug = require('debug')("patchouli:literate");

const runBlock = (globalContext, code) => new Promise((resolve) => {
    const cleanup = () => {
        delete globalContext.__blockContext;
        globalContext.console[ConsoleSymbols.clear]();
    };

    globalContext.__blockContext = {
        resolve: (...args) => {
            const res = new BlockResult({
                args,
                globalContext
            });
            cleanup();
            resolve(res);
        },
        reject: (...args) => {
            const res = new BlockResult({
                args,
                globalContext,
                error: true
            });
            cleanup();
            resolve(res);
        }
    };
    const wrappedCode = wrapCode(code);
    debug("exec", wrappedCode);
    vm.runInContext(wrappedCode, globalContext);
});

const executeLiterate = async (input) => {
    let result = ``;
    const context = vm.createContext(BlockSandbox());

    let inputStart = 0;
    for await (const {code, start: codeStart, end: codeEnd, block, lang} of codeBlocks(input)){
        const {noeval, hide} = parseLang(lang);

        result += input.slice(inputStart, codeStart);

        if(!hide)
            result += block;

        if(!noeval)
            result += (await runBlock(context, code)).toMarkdown();

        inputStart = codeEnd;
    }
    result += input.slice(inputStart);
    return result;
};

module.exports.executeLiterate = executeLiterate;