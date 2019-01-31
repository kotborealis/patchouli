#! /usr/bin/env node

const config = require('./lib/config');
const glob = require('glob');
const md_only = require('./lib/md_only_filter');
const build_document = require('./lib/build_document');

if(config.args.v || config.args.version || config.args.h || config.args.help){
    console.log(require('./lib/help.js'));
    return;
}

const markdown_files = config.args._
    .map(pattern => glob.sync(pattern))
    .reduce((a, b) => a.concat(b), [])
    .filter(md_only);

const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

const types = [config.args.type || config.args.t || config.type || 'pdf'].reduce((a, b) => a.concat(b), []);

const errorHandler = r => {
    if(r.stderr)
        console.error(r.stderr);
    if(r.stdout)
        console.log(r.stdout);
    else
        console.error(r);

    process.exit(1);
};

for(const type of types){
    const {stdout, stderr} = build_document(type, targets).catch(errorHandler);
}

process.on('unhandledRejection', errorHandler);
