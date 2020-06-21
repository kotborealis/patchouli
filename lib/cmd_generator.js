const config = require('./config');
const path = require('path');
const filename_generator = require('./filename_generator');

module.exports = async (filename, type) => {
    let output = filename_generator(filename, type);

    if(filename && path.isAbsolute(filename))
        filename = path.relative(process.cwd(), filename);

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
    config.xelatex_cmd, filename
];