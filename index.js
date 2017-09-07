process.on('unhandledRejection', r => console.error(r));

const config = require('./lib/config');
const args = require('chen.js').args();
const build = require('./lib/build');
const path = require('path');
const glob = require('glob');
const gaze = require('gaze');
const outputFilename = require('./lib/outputFilename');

const file_extension_is = (filename, ext) => path.extname(filename) === '.' + ext;
const ignore_ext_filter = (file) =>
    !config.ignore_ext.reduce((bool, ext) => file_extension_is(file, ext) || bool, false);

const build_file = (input) => {
    console.log("WANNA BUILD", input);
    if(!ignore_ext_filter(input)) return;

    console.log("BUILD", input);

    const file = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
    const type = args.type || 'html';
    const output = args.output || outputFilename(file, type);
    build(file, output, type);
};

const build_glob = (patterns) =>
    patterns
        .forEach(pattern =>
            glob.sync(pattern)
                .filter(ignore_ext_filter)
                .forEach(build_file)
        );

const watch_glob = (patterns) => {
    patterns.forEach(pattern => {
        gaze(pattern, function(){
            this.on('changed', build_file);
            this.on('added', build_file);
        });
    });
};

const input_files = args._;

if(input_files.length){
    if(args.w || args.watch){
        build_glob(input_files);
        watch_glob(input_files);
    }
    else{
        build_glob(input_files);
    }
}