module.exports = {
    ignore_ext: ['html', 'pdf'],
    clean_ext: ['html', 'pdf'],
    default_pandoc: [
        '--smart',
        '--standalone',
        '--toc'
    ],
    default_html: [
        `--to`,
        `html5`,
        '--mathjax=/mathjax/MathJax.js?config=TeX-AMS_CHTML-full,local/local',
        '-c', '/resources/pandoc.css'
        // '--self-contained',
        // `-H`, css,
    ],
    default_pdf: [

    ],

    pandoc: [],
    html: [],
    pdf: []
};