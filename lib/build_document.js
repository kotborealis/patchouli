const config = require('./config');
const build_file = require('./build_file');
const concat_files = require('./concat-files');
const outputFilename = require('./outputFilename');
const debug = require('./debug');
const path = require('path');
const fs = require('fs');

module.exports = async (type, targets) => {
    const info = {
        document_path: null,
        concat_path: null,
        tex_path: null
    };

    if(!fs.existsSync(config.output_dir)){
        debug("Create output dir");
        fs.mkdirSync(config.output_dir);
    }

    info.concat_path =  outputFilename(path.join(config.output_dir, config.output), 'md');
    info.document_path = outputFilename(info.concat_path, type);
    info.tex_path = outputFilename(info.concat_path, 'tex');

    debug(info.concat_path);
    debug(info.tex_path);
    debug(info.document_path);

    debug("Concat md");
    concat_files(targets.sort(), info.concat_path);

    debug("Build tex");
    await build_file(info.concat_path, 'tex');
    debug("Build pdf");
    await build_file(info.tex_path, 'pdf');

    debug(`Move pdf to cwd`);
    fs.renameSync(info.document_path, path.basename(info.document_path));

    return info;
};