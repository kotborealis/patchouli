#! /usr/bin/env node

const config = require('./lib/config');
const glob = require('glob');
const md_only = require('./lib/md_only_filter');
const build_document = require('./lib/build_document');
const unlink = require('./lib/unlink');

const markdown_files = config.args._
    .map(pattern => glob.sync(pattern))
    .reduce((a, b) => a.concat(b), [])
    .filter(md_only);

const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

const type = config.args.type || config.args.t || 'pdf';

build_document(type, targets).then(async ({document_path, concat_path, tex_path}) => {
    if(!config.args['keep-sources'])
        await unlink([concat_path, tex_path]);

    process.exit(0);
}).catch(r   => {
    if(r.stderr)
        console.error(r.stderr);
    else
        console.error(r);

    process.exit(1);
});

process.on('unhandledRejection', r => {
    if(r.stderr)
        console.error(r.stderr);
    else
        console.error(r);

    process.exit(1);
});