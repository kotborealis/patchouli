const path = require('path');
const patchouly_root = "/opt/src";

module.exports = {
    pandoc_path: `docker run -v ${process.cwd()}:/source --rm patchouli-pandoc:latest`,

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
    default_pdf: [
        `--template=${path.join(patchouly_root, 'resources', './default.latex')}`,
        `--filter=${path.join(patchouly_root, 'scripts', './pandoc-svg.py')}`,
        `--pdf-engine=xelatex`,
        `--variable`, 'mainfont="CMU Serif"',
        `--variable`, 'sansfont="CMU Sans Serif"',
        `--variable`, `monofont="CMU Typewriter Text"`
    ],

    pandoc: [],
    html: [],
    pdf: []
};