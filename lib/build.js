const pandoc = require('./pandoc');
const config = require('./config');

module.exports = (filename, output = null, type = 'html') => {
    if(type === 'pdf'){

    }
    else{
        return build_html(filename, output);
    }
};

const build_args = (args = [], type = 'html') =>
    [
        ...config.default_pandoc,
        ...(config.pandoc || []),
        ...config[`default_${type}`],
        ...(config[type] || []),
        ...args
    ].join(' ');

const build_html = async (filename, output = null) => {
    const args = [];
    if(output) args.push(`-o ${output}`);
    return await pandoc(filename, build_args(args, 'html'));
};