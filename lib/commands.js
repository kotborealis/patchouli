const fs = require('fs');
const path = require('path');
const gaze = require('gaze');
const debounce = require('debounce');
const liveServer = require("live-server");
const config = require('./config');
const outputFilename = require('./outputFilename');
const build = require('./build');
const concat_files = require('./concat-files');

const patchouly_root = path.dirname(require.resolve('../'));

const act = {
    live: Symbol('live'),
    watch: Symbol('watch'),
    clean: Symbol('clean'),
    build: Symbol('build'),
    scaffold: Symbol('scaffold')
};

const handlers = {
    [act.watch]: ({mode, type}, targets) => {
        console.log("Watching files", targets);
        gaze(targets, function(){
            this.on('changed', file =>
                debounce(() => handlers[act.build]({mode, type}, [file]), 1, true)()
            );
        });
    },
    [act.live]: ({mode, type}, targets) => {
        console.log("Starting live-server...");

        console.log("Ignore", targets.join(','));
        liveServer.start({
            ignore: targets.join(','),
            port: config.port || undefined,
            open: false,
            wait: 1500,
            mount: [
                ['/resources', path.join(patchouly_root, './resources')],
                ['/mathjax', path.join(path.dirname(require.resolve('mathjax')), '..')],
            ]
        });


    },
    [act.build]: async ({mode, type}, targets) => {
        if(config.args.concat){
            const concat = typeof config.args.concat === "string" ? config.args.concat : "build.md";

            concat_files(targets.sort(), concat);

            if(config.args['keep-tex'])
                await build(concat, 'tex', mode);

            await build(concat, type, mode);

            if(!config.args['keep-concat'])
                fs.unlink(concat, () => null);
        }
        else{
            await Promise.all(targets.map((file) => build(file, type, mode)));

            if(config.args['keep-tex'])
                await Promise.all(targets.map((file) => build(file, 'tex', mode)));
        }
    },
    [act.clean]: ({mode, type}, targets) => {
        console.log("Cleaning...");

        targets
            .map(target => config.clean_ext.map(ext => outputFilename(target, ext)))
            .reduce((a, b) => a.concat(b))
            .forEach(file => fs.unlink(file, () => null));

        process.exit(0);
    },
    [act.scaffold]: async () => {
        const stdin = new (require('async-readline'));

        let files = [];
        let text;
        do{
            text = await stdin.question("Input new file name (empty to stop): ");
            files.push(text);
        }
        while(text);

        files = files.filter(_ => _);

        const count = files.length;
        const max_chapter = (count * 10).toString();

        files.forEach((file, i) => {
            const num = ((i + 1) * 10).toString().padStart(max_chapter.length, '0');
            const filename = `${num}_${file}.md`;
            console.log("\tCreating ", filename);
            fs.writeFileSync(filename, `\n\\newpage`);
        });

        console.log("\tCopying .patchouli.js");
        fs.createReadStream(path.join(patchouly_root, './resources', '.patchouli-writing.js'))
            .pipe(fs.createWriteStream('.patchouli.js'));


        console.log("\tCopying .gitignore");
        fs.createReadStream(path.join(patchouly_root, './resources', '.gitignore'))
            .pipe(fs.createWriteStream('.gitignore'));

        console.log("\tCopying ~/.patchouli/00_header.md");
        fs.createReadStream(path.join(patchouly_root, './resources', '00_header.md'))
            .pipe(fs.createWriteStream('00_header.md'));

        stdin.close();
    }
};

module.exports = {
    handlers,
    act,
    cleanup: handlers[act.clean]
};