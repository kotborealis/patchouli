const binary = require('./binary');
const config = require('./config');
const path = require('path');
const outputFilename = require('./outputFilename');
const fs = require('fs');

module.exports = async (filename, type = 'html', mode = 'release') => {
    let output = outputFilename(filename, type);

    if(output && path.isAbsolute(output)){
        output = path.relative(process.cwd(), output);
    }

    if(filename && path.isAbsolute(filename))
        filename = path.relative(process.cwd(), filename);

    await build_pandoc(filename, output, type, mode);
};

const build_pandoc = (filename, output, type, mode) =>
    binary(filename, build_pandoc_args(output ? [`-o`, output] : [], type, mode), config.pandoc_path);

const build_pandoc_args = (args = [], type = 'html', mode = 'release') =>
    [
        ...config.default_pandoc,
        ...(config.pandoc || []),

        ...(config[`default_${type}`] || []),
        ...(config[type] || []),

        ...(config[mode] ? config[mode][type] || [] : []),

        ...args
    ];