const fs = require('fs');
const path = require('path');
const gaze = require('gaze');
const debounce = require('debounce');
const liveServer = require("live-server");
const config = require('./config');
const outputFilename = require('./outputFilename');
const build = require('./build');

const patchouly_root = path.dirname(require.resolve('../'));

const act = {
    live: Symbol('live'),
    watch: Symbol('watch'),
    clean: Symbol('clean'),
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
        targets.forEach((file) => build(file, outputFilename(file, type), type, mode), 1000, true);
    },
    [act.clean]: ({mode, type}, targets) => {
        console.log("Cleaning...");

        targets
            .map(target => config.clean_ext.map(ext => outputFilename(target, ext)))
            .reduce((a, b) => a.concat(b))
            .forEach(file => fs.unlink(file, () => null));
        process.exit(0);
    }
};

module.exports = {
    handlers,
    act,
    cleanup: handlers[act.clean]
};