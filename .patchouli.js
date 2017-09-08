const path = require('path');
const css = path.join(path.dirname(require.resolve('./')), 'resources', 'pandoc.css');

module.exports = {
    ignore_ext: ['html', 'pdf'],
    clean_ext: ['html', 'pdf'],
    default_pandoc: [
        '--smart',
        '--standalone',
        '--toc'
    ],
    default_html: [
        '--to html5',
        '--katex',
        `--css ${css}`
    ],
    default_pdf: [

    ],

    pandoc: [],
    html: [],
    pdf: []
};