#! /usr/bin/env node

const config = require('./lib/config');
const glob = require('glob');
const md_only = require('./lib/md_only_filter');
const build_document = require('./lib/build_document');
const cleanup = require('./lib/cleanup');

const markdown_files = config.args._
    .map(pattern => glob.sync(pattern))
    .reduce((a, b) => a.concat(b), [])
    .filter(md_only);

const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

const type = config.args.type || config.args.t || 'pdf';

build_document(type, targets).then(({document_path, concat_path, tex_path}) =>
    cleanup([...concat_path, ...tex_path])
).catch();

process.on('unhandledRejection', r => console.error(r));