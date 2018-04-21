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

    if(type === 'pdf'){
        let output_tex = outputFilename(output, 'tex');
        await build_pandoc(filename, output_tex, 'tex', mode);
        await build_pdf(output_tex, mode);
    }
    else{
        await build_pandoc(filename, output, type, mode);
    }
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

const build_pdf = (filename, mode) =>
    binary(filename, build_pdf_args(filename, mode), config.pdf_engine_path);

const build_pdf_args = (args = [], mode = 'release') =>
    [
        ...config.default_pdf,
        ...(config[mode] ? config[mode]['pdf'] || [] : []),
        ...args
    ];