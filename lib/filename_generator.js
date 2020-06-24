const {
    dirname,
    isAbsolute,
    join,
    parse,
    relative
} = require('path');
const debug = require('./debug').extend('outputFilename');

module.exports = (name, type) => {
    if(type === 'revealjs')
        type = 'revealjs.html';

    let output = `${join(dirname(name), parse(name).name)}.${type}`;

    if(output && isAbsolute(output))
        output = relative(process.cwd(), output);

    debug("outputFilename output", {name, type, output});

    return output;
};