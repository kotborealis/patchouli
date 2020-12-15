const path = require('path');
const os = require('os');
const {uid, gid} = os.userInfo();
const patchouly_root = "/opt/src";

let config = {
    // docker-specific settings
    docker: {
        // volume mounts
        mounts: [
            [process.cwd(), '/source'],
            ['/tmp', '/tmp'],
            ['~/.patchouli/', '/opt/src/resources']
        ]
    },

    // default pandoc params
    default_pandoc: [
        `-f`, `markdown+yaml_metadata_block+smart+fancy_lists+raw_tex-auto_identifiers`,
        '--standalone',
        '--toc',
    ],

    // default tex params
    default_tex: [
        `--template=${path.join(patchouly_root, 'resources', './default.latex')}`,
    ],

    // default docx params
    default_docx: [

    ],

    // default revealjs params
    default_revealjs: [
		`--template=${path.join(patchouly_root, 'resources', './default.revealjs')}`,
        `-V`, `revealjs-url=https://awooo.ru/reveal.js`,
        `--slide-level`, `2`,
        `-t`, `revealjs`
    ],

    // default html params
    default_html: [
        `--katex`
    ],

    // output files dir
    output_dir: '.out',
    // output file name
    output: 'build.md',

    // default args
    args: {},

    // output extensions mapping
    output_ext_mapping: {
        // output revealjs files as html files
        revealjs: "html"
    },

    // use literate generator to execute inlined js code
    literate: false
};

config = Object.assign(config, {
    docker_cmd: cmd => `docker run
        --user="${uid}:${gid}" 
        --net=none
        --pid=host
        --uts=host
        --rm
        ${config.docker.mounts.map(([host, container]) => `-v ${host}:${container}`).join(' ')}
        kotborealis/patchouli:latest
        /bin/bash -c "${
            cmd.join(" && ").replace(/"/g, "\\\"")
        }"`.replace(/\n/g, ''),
    pandoc_cmd: `/usr/bin/pandoc -s `,
    xelatex_cmd: `xelatex -output-directory=${config.output_dir} `
});

module.exports = config;
