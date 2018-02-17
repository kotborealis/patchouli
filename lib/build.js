const pandoc = require('./pandoc');
const config = require('./config');
const path = require('path');

module.exports = (filename, output = null, type = 'html', mode = 'release') => {
    if(output && path.isAbsolute(output)){
        output = path.relative(output, process.cwd());
    }

    console.log(build_args(output ? [`-o`, output] : [], type, mode).join(' '));

    return pandoc(filename, build_args(output ? [`-o`, output] : [], type, mode), config.pandoc_path);
};

const build_args = (args = [], type = 'html', mode = 'release') =>
    [
        ...config.default_pandoc,
        ...(config.pandoc || []),

        ...config[`default_${type}`],
        ...(config[type] || []),

        ...config[mode][type],

        ...args
    ];