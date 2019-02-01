#! /usr/bin/env node

const config = require('./lib/config');
const glob = require('glob');
const md_only = require('./lib/md_only_filter');
const build_document = require('./lib/build_document');
const format_log = require('./lib/log/format');
const parse_log = require('./lib/log/parse');

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

const handleOut = ({stderr, stdout}) => {
    if(stdout){
        console.log(format_log(parse_log.parse(stdout)));
        return true;
    }
    if(stderr){
        console.log(format_log(parse_log.parse(stderr)));
        return true;
    }
    return false;
}

const errorHandler = r => {
    if(!handleOut(r))
        console.error(r);

    process.exit(1);
};

(async () => {
    for(const type of types){
        const info = await build_document(type, targets).catch(errorHandler);
        handleOut(info);
    }
})();

process.on('unhandledRejection', errorHandler);
