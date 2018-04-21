const path = require('path');
const patchouly_root = "/opt/src";

let config = {
    pandoc_path: `docker run -v ${process.cwd()}:/source --rm patchouli-pandoc:latest`,
    pdf_engine: 'xelatex',

    ignore_ext: ['html', 'pdf'],
    clean_ext: ['html', 'pdf'],

    live: {
        html: [
            '--mathjax=/mathjax/MathJax.js?config=TeX-AMS_CHTML-full,local/local',
            '-c', '/resources/pandoc.css'
        ],
        pdf: [

        ]
    },

    release: {
        html: [
            '--mathjax',
            '-H', path.join(patchouly_root, 'resources', 'pandoc.css.html')
        ],
        pdf: [

        ]
    },

    default_pandoc: [
        `-f`, `markdown+smart`,
        '--standalone',
        '--toc',
        '--quiet',
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
        `--filter=${path.join(patchouly_root, 'scripts', './pandoc-svg.py')}`,
        `--variable`, 'mainfont="CMU Serif"',
        `--variable`, 'sansfont="CMU Sans Serif"',
        `--variable`, `monofont="CMU Typewriter Text"`
    ],

    default_pdf: [
        `--interaction=batchmode`
    ],

    pandoc: [],
    html: [],
    pdf: []
};

config = Object.assign(config, {
    pdf_engine_path: `docker run -v ${process.cwd()}:/source  --entrypoint "${config.pdf_engine}" --rm patchouli-pandoc:latest`,
});

module.exports = config;