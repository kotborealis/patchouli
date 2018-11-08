const exec_binary = require('./exec_binary');
const config = require('./config');
const path = require('path');
const outputFilename = require('./outputFilename');

module.exports = async (filename, type) => {
    let output = outputFilename(filename, type);

    if(filename && path.isAbsolute(filename))
        filename = path.relative(process.cwd(), filename);



    if(type === 'pdf')
        await build_xelatex(filename, output);
    else
        await build_pandoc(filename, output, type);
};

const build_pandoc = (filename, output, type) =>
    exec_binary(config.pandoc_path, filename, build_pandoc_args(output ? [`-o`, output] : [], type));

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

const build_xelatex = (filename, output) =>
    exec_binary(config.xelatex_path, filename, []);