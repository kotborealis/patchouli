const path = require('path');
const os = require('os');
const {uid, gid} = os.userInfo();
const patchouly_root = "/opt/src";

let config = {
    docker: {
        mount_cwd: `-v ${process.cwd()}:/source`,
        mount_tmp: `-v /tmp:/tmp`,
        image: ` --rm kotborealis/patchouli:latest`,
    },

    default_pandoc: [
        `-f`, `markdown+yaml_metadata_block+smart+fancy_lists+raw_tex-auto_identifiers`,
        '--standalone',
        '--toc',
        `--filter`, `pandoc-crossref`
    ],

    default_tex: [
        `--template=${path.join(patchouly_root, 'resources', './default.latex')}`,
    ],

    default_docx: [

    ],

    default_revealjs: [
		`--template=${path.join(patchouly_root, 'resources', './default.revealjs')}`,
        `-V`, `revealjs-url=https://awooo.ru/reveal.js`,
        `--slide-level`, `2`,
        `-t`, `revealjs`
    ],

    pandoc: [],
    tex: [],
    docx: [],
    revealjs: [],

    output_dir: '.out',
    output: 'build.md',

    args: {},

    output_ext_mapping: {
        revealjs: "html"
    }
};

config = Object.assign(config, {
    docker_cmd: cmd => `docker run
        --user="${uid}:${gid}" 
        --net=none
        --pid=host
        --uts=host
        --ipc=host
        ${config.docker.mount_cwd} 
        ${config.docker.mount_tmp} 
        ${config.docker.image}
        /bin/bash -c "${
            cmd.join(" && ").replace(/"/g, "\\\"")
        }"`.replace(/\n/g, ''),
    pandoc_cmd: `/usr/bin/pandoc -s `,
    xelatex_cmd: `xelatex -output-directory=${config.output_dir} `
});

module.exports = config;
