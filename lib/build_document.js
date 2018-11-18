const config = require('./config');
const build_args = require('./build_args');
const exec_binary = require('./exec_binary');
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

    const cmd = [];

    if(type === 'pdf'){
        debug("Build pandoc args");
        const pandoc_args = await build_args(info.concat_path, 'tex');
        debug("Build xelatex args");
        const xelatex_args = await build_args(info.tex_path, 'pdf');

        cmd.push(`${config.pandoc_cmd} ${pandoc_args.join(' ')}`);
        cmd.push(`${config.xelatex_cmd} ${xelatex_args.join(' ')}`);
    }
    else{
        debug("Build pandoc args");
        const pandoc_args = await build_args(info.concat_path, type);
        cmd.push(`${config.pandoc_cmd} ${pandoc_args.join(' ')}`);
    }

    await exec_binary(config.docker_cmd(cmd));

    debug(`Copy ${type} to cwd`);
    fs.copyFileSync(info.document_path, path.basename(info.document_path));

    return info;
};