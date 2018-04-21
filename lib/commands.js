const fs = require('fs');
const path = require('path');
const gaze = require('gaze');
const debounce = require('debounce');
const liveServer = require("live-server");
const config = require('./config');
const args = require('chen.js').args();
const outputFilename = require('./outputFilename');
const build = require('./build');

const patchouly_root = path.dirname(require.resolve('../'));

const act = {
    live: Symbol('live'),
    watch: Symbol('watch'),
    clean: Symbol('clean'),
    clean_pdf_tmp: Symbol('clean_pdf_tmp'),
    build: Symbol('build'),
};

const handlers = {
    [act.watch]: ({mode, type}, targets) => {
        gaze(targets, function(){
            this.on('changed', file =>
                debounce(() => handlers[act.build]({mode, type}, file), 1000, true)
            );
        });
    },
    [act.live]: ({mode, type}, targets) => {
        console.log("Starting live-server...");

        liveServer.start({
            ignore: targets.map(i => path.join(process.cwd(),i)).join(','),
            port: config.port || undefined,
            mount: [
                ['/resources', path.join(patchouly_root, './resources')],
                ['/mathjax', path.join(path.dirname(require.resolve('mathjax')), '..')],
            ]
        });
    },
    [act.build]: ({mode, type}, targets) => {
        targets.map((file) =>
            build(file, type, mode)
                .then(handlers[act.clean_pdf_tmp].bind(null, file))
        );
    },
    [act.clean]: ({mode, type}, targets) => {
        console.log("Cleaning...");

        targets
            .map(target => config.clean_ext.map(ext => outputFilename(target, ext)))
            .reduce((a, b) => a.concat(b))
            .forEach(handlers[act.clean_pdf_tmp])
            .forEach(file => fs.unlink(file, () => null));
    },
    [act.clean_pdf_tmp]: (target) => {
        ['aux', 'log', 'out', 'dvi', 'tex']
            .map(ext => outputFilename(target, ext))
            .filter(file => file !== target)
            .forEach(file => fs.unlink(file, () => null));
        fs.unlink('texput.log', () => null);
    }
};

module.exports = {
    handlers,
    act,
    cleanup: handlers[act.clean]
};