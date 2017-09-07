const pandoc = require('./pandoc');
const config = require('./config');

module.exports = (filename, output = null, type = 'html') => {
    return pandoc(filename, build_args(output ? [`-o ${output}`] : [], type));
};

const build_args = (args = [], type = 'html') =>
    [
        ...config.default_pandoc,
        ...(config.pandoc || []),
        ...config[`default_${type}`],
        ...(config[type] || []),
        ...args
    ].join(' ');