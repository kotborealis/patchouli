const pandoc = require('./pandoc');
const config = require('./config');
const path = require('path');
const outputFilename = require('./outputFilename');

module.exports = (filename, type = 'html', mode = 'release') => {
    let output = outputFilename(filename, type);

    if(output && path.isAbsolute(output)){
        output = path.relative(process.cwd(), output);
    }

    if(filename && path.isAbsolute(filename))
        filename = path.relative(process.cwd(), filename);

    if(type === 'pdf'){
        let output_tex = outputFilename(output, 'tex');
        build_pandoc(filename, output_tex, 'tex', mode);
        build_pdf(output_tex, output, 'pdf', mode);
    }
    else
        build_pandoc(filename, output, type, mode);
};

const build_pandoc = (filename, output, type, mode) =>
    pandoc(filename, build_pandoc_args(output ? [`-o`, output] : [], type, mode), config.pandoc_path);

const build_pandoc_args = (args = [], type = 'html', mode = 'release') =>
    [
        ...config.default_pandoc,
        ...(config.pandoc || []),

        ...(config[`default_${type}`] || []),
        ...(config[type] || []),

        ...(config[mode] ? config[mode][type] || [] : []),

        ...args
    ];

const build_pdf = (filename, output, type, mode) =>
    pandoc(filename, build_pdf_args(filename, mode), config.pdf_engine_path);

const build_pdf_args = (args = [], mode = 'release') =>
    [
        ...config.default_pdf,
        ...(config[mode] ? config[mode]['pdf'] || [] : []),
        ...args
    ];