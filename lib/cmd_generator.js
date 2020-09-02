const {
    isAbsolute,
    relative
} = require('path');

const filename_generator = require('./filename_generator');
const config = require('./config');

module.exports = async (filename, type) => {
    let output = filename_generator(filename, type);

    if(filename && isAbsolute(filename))
        filename = relative(process.cwd(), filename);

    if(type === 'pdf')
        return build_cmd_xelatex(filename);
    else
        return build_cmd_pandoc(filename, output, type);
};

const build_cmd_pandoc = (filename, output, type) =>
    [
        config.pandoc_cmd,

        `-s ${filename}`,
        `-o ${output}`,

        ...(config.default_pandoc || []),
        ...(config.pandoc || []),

        ...(config[`default_${type}`] || []),
        ...(config[type] || [])
    ];

const build_cmd_xelatex = (filename) => [
    config.xelatex_cmd,
    filename
];