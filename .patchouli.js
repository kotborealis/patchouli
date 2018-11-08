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
    pandoc_path: `docker run 
        --entrypoint /usr/bin/pandoc
        ${config.docker.mount_cwd} 
        ${config.docker.mount_tmp} 
        ${config.docker.image}`.replace(/\n/g, ''),
    xelatex_path: `docker run 
        ${config.docker.mount_cwd} 
        ${config.docker.mount_tmp} 
        ${config.docker.image}
        xelatex -output-directory=${config.output_dir} -aux-directory=${config.output_dir}`.replace(/\n/g, ''),
});

module.exports = config;
