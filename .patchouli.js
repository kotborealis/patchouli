const path = require('path');
const patchouly_root = "/opt/src";

let config = {
    docker: {
        mount_cwd: `-v ${process.cwd()}:/source`,
        mount_tmp: `-v /tmp:/tmp`,
        image: ` --rm kotborealis/patchouli:latest`,
    },

    ignore_ext: ['html', 'pdf'],
    clean_ext: ['html', 'pdf'],

    default_pandoc: [
        `-f`, `markdown+smart+fancy_lists+raw_tex`,
        '--standalone',
        '--toc',
        `--filter`, `pandoc-crossref`,
        `--filter`, `pandoc-include-code`
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
        ${config.docker.mount_cwd} 
        ${config.docker.mount_tmp} 
        ${config.docker.image}
        /bin/bash -c "${
            cmd.join(" && ").replace(/"/g, "\\\"")
        }"`.replace(/\n/g, ''),
    pandoc_cmd: `/usr/bin/pandoc`,
    xelatex_cmd: `xelatex -output-directory=${config.output_dir} -aux-directory=${config.output_dir}`
});

module.exports = config;
