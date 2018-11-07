#! /usr/bin/env node

const fs = require('fs');

const config = require('./lib/config');
const glob = require('glob');
const md_only = require('./lib/md_only_filter');
const build_document = require('./lib/build_document');

const markdown_files = config.args._
    .map(pattern => glob.sync(pattern))
    .reduce((a, b) => a.concat(b), [])
    .filter(md_only);

const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

const type = config.args.type || config.args.t || 'pdf';

build_document(type, targets).then(({document_path, concat_path, tex_path}) => {
    if(!config.args['keep-sources']){
        concat_path.forEach(_ => fs.unlink(_, () => null));
        tex_path.forEach(_ => fs.unlink(_, () => null));
    }
});

process.on('unhandledRejection', r => console.error(r));