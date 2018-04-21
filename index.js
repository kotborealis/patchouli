#! /usr/bin/env node

const args = require('chen.js').args();
const build = require('./lib/build');
const glob = require('glob');
const outputFilename = require('./lib/outputFilename');
const md_only = require('./lib/md_only_filter');
const commands = require('./lib/commands');

const build_file = file => {
    console.log("Building file ", file);
    build(file, outputFilename(file, type), type, mode);
};

const markdown_files = args._
    .map(pattern => glob.sync(pattern))
    .reduce((a, b) => a.concat(b), [])
    .filter(md_only);

const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

if(!args._[0]){
    console.log('asdad"');
    args._[0] = "*";
}

const act_live  = args.l || args.live  || args._[0][0] === 'l';
const act_watch = args.w || args.watch || args._[0][0] === 'w' || act_live;
const act_clean = args.c || args.clean || args._[0][0] === 'c' || act_live;

const type = args.type || args.t || 'html';
const mode = (act_live || act_watch) ? 'live' : 'release';

console.log("Mode: ", mode);

if(args.l || args.live || args._[0] === 'live'){
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