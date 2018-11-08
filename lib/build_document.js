const config = require('./config');
const build_file = require('./build_file');
const concat_files = require('./concat-files');
const outputFilename = require('./outputFilename');
const debug = require('./debug');

module.exports = async (type, targets) => {
    const info = {
        document_path: null,
        concat_path: null,
        tex_path: null
    };

    const concat_filename = typeof config.args.concat === "string" ? config.args.concat : ".build.md";
    info.concat_path = concat_filename;
    info.document_path = outputFilename(info.concat_path, type);
    info.tex_path = outputFilename(info.concat_path, 'tex');

    concat_files(targets.sort(), concat_filename);

    try{
        await build_file(concat_filename, type);
    }
    catch(e){
        console.error(`Encountered error during build, building standalone ${info.tex_path} file for debugging purposes...`);
        await build_file(concat_filename, 'tex');
        throw e;
    }

    if(config.args['keep-sources']){
        debug(`Building standalone ${info.tex_path} file because --keep-sources is present`);
        await build_file(concat_filename, 'tex');
    }

    return info;
};