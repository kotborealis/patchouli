const Plotter = require('./BlockPlotter');
const {BlockTable} = require('./BlockTable');
const {BlockConsole} = require('./BlockConsole');
const {ConsoleSymbols} = require('./BlockConsole');

module.exports.consoleSymbols = ConsoleSymbols;
module.exports.BlockSandbox = () => ({
    require,
    console: new BlockConsole,
    Plotter,
    BlockTable,
});