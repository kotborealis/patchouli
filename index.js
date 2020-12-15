#! /usr/bin/env node

const args = require('chen.js').args();
const config = require('./lib/config');
const glob = require('glob');
const md_only = require('./lib/predicate_md_files');
const build_document = require('./lib/document_builder');
const debug = require('./lib/debug').extend('main');

if(args.v || args.version) {
const package_info = require('./package.json');
    console.log(`
${package_info.name} \t v.${package_info.version}
\t* github: \t ${package_info.repository.url}
\t* author: \t ${package_info.author}
    `.trim());
    return;
}
if(args.h || args.help){
    const {dirname, resolve} = require('path');
    console.log(`
Patchouli: converts markdown files in working directory to specified type.
Uses .patchouli.js from working directory as config,
see ${resolve(dirname(require.resolve('./')), '.patchouli.js')} for reference
Usage:
\t-v, --version \t\t View version info.
\t-h, --help \t\t View this guide.
\t-t=name, --type=name \t Convert markdown to specified type.
\t\t\t\t Supports: tex, pdf, revealjs, html, docx
\t--config=file \t\t Specify full path to configuration file
    `.trim());
    return;
}

const markdown_files = args._
    .map(pattern => glob.sync(pattern))
    .reduce((a, b) => a.concat(b), [])
    .filter(md_only);

debug("Searching for md files", markdown_files);

const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

debug("Found target files", targets);

const types = [args.type || args.t || config.type || 'pdf'].reduce((a, b) => a.concat(b), []);

debug("Build types", types);

const errorHandler = r => {
    if(r.stderr)
        console.error(r.stderr);
    if(r.stdout)
        console.log(r.stdout);
    else
        console.error(r);

    process.exit(1);
};

types.forEach(type => {
    debug("Building type", type, targets);
    build_document(type, targets).catch(errorHandler);
});

process.on('unhandledRejection', errorHandler);
