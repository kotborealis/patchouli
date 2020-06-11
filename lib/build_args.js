const config = require('./config');
const path = require('path');
const outputFilename = require('./outputFilename');

module.exports = async (filename, type) => {
    let output = outputFilename(filename, type);

    if(filename && path.isAbsolute(filename))
        filename = path.relative(process.cwd(), filename);

    if(type === 'pdf')
        return await build_xelatex(filename);
    else
        return await build_pandoc(filename, output, type);
};

const build_pandoc = (filename, output, type) =>
    [
        `-s "${filename}"`,
        `-o "${output}"`,

        ...(config.default_pandoc || []),
        ...(config.pandoc || []),

        ...(config[`default_${type}`] || []),
        ...(config[type] || [])
    ];

const build_xelatex = (filename) => [`"${filename}"`];
