#! /usr/bin/env node

process.on('unhandledRejection', r => console.error(r));

const config = require('./lib/config');
const args = require('chen.js').args();
const build = require('./lib/build');
const path = require('path');
const glob = require('glob');
const gaze = require('gaze');
const outputFilename = require('./lib/outputFilename');
const fs = require('fs');
const md_only = require('./lib/md_only_filter');
const liveServer = require("live-server");

const build_file = file => {
    console.log("Building file ", file);
    build(file, outputFilename(file, type), type);
};

const to_plain_array = (a, b) => [...a, ...b];

const markdown_files = args._
    .map(pattern => glob.sync(pattern))
    .reduce(to_plain_array, [])
    .filter(md_only);

const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

const act_live  = args.l || args.live  || args._.indexOf('live')  >= 0;
const act_watch = args.w || args.watch || args._.indexOf('watch') >= 0 || act_live;
const act_clean = args.c || args.clean || args._.indexOf('clean') >= 0;
const act_build = !act_watch && !act_clean;

const type = args.type || args.t || 'html';

switch(true){
    case act_build: {
        console.log("Building targets...");
        targets.forEach(build_file);
        break;
    }
    case act_watch: {
        if(act_live){
            console.log("Starting live-server...");
            liveServer.start({
                port: config.port || undefined
            });
        }

        console.log("Building targets...");
        targets.forEach(build_file);
        console.log("Watching targets...");
        gaze(targets, function(){
            this.on('changed', file =>
                setTimeout(() => build_file(file), 200)
            );
        });
        break;
    }
    case act_clean: {
        console.log("Cleaning...");
        targets
            .map(target => config.clean_ext.map(ext => outputFilename(target, ext)))
            .reduce(to_plain_array)
            .forEach(file => fs.unlink(file, () => null));
        break;
    }
}