#! /usr/bin/env node

const config = require('./lib/config');
const glob = require('glob');
const md_only = require('./lib/md_only_filter');
const build_document = require('./lib/build_document');

if(config.args.v || config.args.version || config.args.h || config.args.help){
    const package = require('./package.json');
    console.log(`${package.name} \t v.${package.version}`);
    console.log(``);
    console.log(`\t* npm: \t\t https://npmjs.org/package/${package.name}`);
    console.log(`\t* github: \t ${package.repository.url}`);
    console.log(`\t* readme: \t ${package.repository.url.split('.git')[0]}/blob/master/readme.md`);
    console.log(`\t* author: \t ${package.author}`);
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

types.forEach(type =>
    build_document(type, targets).catch(errorHandler)
);

process.on('unhandledRejection', errorHandler);
