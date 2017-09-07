module.exports = {
    ignore_ext: ['html', 'pdf'],
    default_pandoc: [
        '--smart',
        '--standalone',
        '--toc'
    ],
    default_html: [
        '--to html5'
    ],
    default_pdf: [

    ],

    pandoc: [],
    html: [],
    pdf: []
};