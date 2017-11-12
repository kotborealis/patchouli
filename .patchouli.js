const path = require('path');
const patchouly_root = path.dirname(require.resolve('./'));

module.exports = {
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
        '--smart',
        '--standalone',
        '--toc'
    ],
    default_html: [
        `--to`,
        `html5`,
        `-H`, path.join(patchouly_root, 'resources', 'mathjax.html')
    ],
    default_pdf: [
        `--template=${path.join(patchouly_root, 'resources', './default.latex')}`,
        `--filter=${path.join(patchouly_root, 'scripts', './pandoc-svg.py')}`
    ],

    pandoc: [],
    html: [],
    pdf: []
};