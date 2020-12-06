const symbols = {
    clear: Symbol.for('clear'),
    output: Symbol.for('output')
};

const Console = function() {
    const console_ = {
        [symbols.output]: [],
        [symbols.clear]: () =>
            console_[symbols.output] = [],
        log: (...args) =>
            console_[symbols.output].push(args)
    };

    console_.debug = console_.log;
    console_.error = console_.log;
    console_.info = console_.log;
    console_.warn = console_.log;

    return console_;
};

module.exports = {BlockConsole: Console, ConsoleSymbols: symbols};