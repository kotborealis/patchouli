const config = require('./config');
const build_args = require('./cmd_generator');
const exec = require('./exec_env');
const concat_files = require('./concat_files');
const filename_generator = require('./filename_generator');
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
        debug("Create output dir", config.output_dir);
        fs.mkdirSync(config.output_dir);
    }

    info.concat_path = filename_generator(path.join(config.output_dir, config.output), 'md');
    info.document_path = filename_generator(info.concat_path, type);
    info.tex_path = filename_generator(info.concat_path, 'tex');

    debug("Generating document info", info);

    debug("Concat targets into md", targets, info.concat_path);
    concat_files(targets.sort(), info.concat_path);

    const cmd = [];

    if(type === 'pdf'){
        debug("Build pandoc args");
        const pandoc_args = await build_args(info.concat_path, 'tex');
        debug("Build xelatex args");
        const xelatex_args = await build_args(info.tex_path, 'pdf');

        cmd.push(pandoc_args.join(' '));
        cmd.push(xelatex_args.join(' '));
    }
    else{
        debug("Build pandoc args");
        const pandoc_args = await build_args(info.concat_path, type);
        cmd.push(pandoc_args.join(' '));
    }

    await exec(config.docker_cmd(cmd));

    debug(`Copy ${type} to cwd`);
    fs.copyFileSync(info.document_path, path.basename(info.document_path));

    return info;
};