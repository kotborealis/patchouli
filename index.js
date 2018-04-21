#! /usr/bin/env node

const args = require('chen.js').args();
const glob = require('glob');
const md_only = require('./lib/md_only_filter');
const commands = require('./lib/commands');

const markdown_files = args._
    .map(pattern => glob.sync(pattern))
    .reduce((a, b) => a.concat(b), [])
    .filter(md_only);

const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

if(!args._[0]){
    console.log('asdad"');
    args._[0] = "*";
}

const type = args.type || args.t || 'html';
let mode = args.mode || args.m || 'release';

console.log("Mode: ", mode);

if(args.l || args.live || args._[0] === 'live'){
    mode = 'live';
    console.log("Mode: ", mode);

    commands.handlers[commands.act.build]({mode, type}, targets);
    commands.handlers[commands.act.live ]({mode, type}, targets);
    commands.handlers[commands.act.watch]({mode, type}, targets);

    process.on('exit', commands.cleanup.bind(null, {mode, type}, targets));
    process.on('SIGINT', commands.cleanup.bind(null, {mode, type}, targets));
}
else if(args.w || args.watch || args._[0]=== 'watch'){
    commands.handlers[commands.act.build]({mode, type}, targets);
    commands.handlers[commands.act.watch]({mode, type}, targets);

    process.on('exit', commands.cleanup.bind(null, {mode, type}, targets));
    process.on('SIGINT', commands.cleanup.bind(null, {mode, type}, targets));
}
else if(args.c || args.clean || args._[0] === 'clean'){
    commands.cleanup({mode, type}, targets);
}
else{
    commands.handlers[commands.act.build]({mode, type}, targets);
}

process.on('unhandledRejection', r => console.error(r));