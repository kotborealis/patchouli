const pandoc_binary = require('./pandoc_binary');
const config = require('./config');
const path = require('path');
const outputFilename = require('./outputFilename');

module.exports = async (filename, type = 'pdf') => {
    let output = outputFilename(filename, type);

    if(filename && path.isAbsolute(filename))
        filename = path.relative(process.cwd(), filename);

    await build_pandoc(filename, output, type);
};

const build_pandoc = (filename, output, type) =>
    pandoc_binary(filename, build_pandoc_args(output ? [`-o`, output] : [], type), config.pandoc_path);

const build_pandoc_args = (args = [], type = 'pdf') =>
    [
        ...config.default_pandoc,
        ...(config.pandoc || []),

        ...(config[`default_${type}`] || []),
        ...(config[type] || []),

        ...args,

        Object.keys(config.args)
            .filter(_ => _.indexOf("pandoc-") === 0)
            .map(key => [`--${key.slice("pandoc-".length)}=${config.args[key]}`,])
    ];