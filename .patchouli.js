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
        `-f`, `markdown+smart+fancy_lists+raw_tex`,
        '--standalone',
        '--toc',
        `--filter`, `pandoc-crossref`
    ],

    default_html: [
        `--to`,
        `html5`,
        `-H`, path.join(patchouly_root, 'resources', 'mathjax.html'),
    ],
    default_tex: [
        `--template=${path.join(patchouly_root, 'resources', './default.latex')}`,
        `--variable`, 'mainfont="CMU Serif"',
        `--variable`, 'sansfont="CMU Sans Serif"',
        `--variable`, `monofont="CMU Typewriter Text"`
    ],
    default_pdf: [
        `--template=${path.join(patchouly_root, 'resources', './default.latex')}`,
        `--variable`, 'mainfont="CMU Serif"',
        `--variable`, 'sansfont="CMU Sans Serif"',
        `--variable`, `monofont="CMU Typewriter Text"`,
        `--pdf-engine=xelatex`
    ],

    pandoc: [],
    html: [],
    pdf: [],

    output_dir: '.out',
    output: 'build',

    args: {},
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
    pandoc_cmd: `/usr/bin/pandoc `,
    xelatex_cmd: `xelatex -output-directory=${config.output_dir} `
});

module.exports = config;
