#! /usr/bin/env node

const args = require('chen.js').args();
const glob = require('glob');
const md_only = require('./lib/predicate_md_files');
const build_document = require('./lib/document_builder');
const debug = require('./lib/debug').extend('main');
const package_info = require('./package.json');
const chokidar = require('chokidar');
const {exec} = require('child_process');

if(args.h || args.help) {
    console.log(`${package_info.name}: pandoc wrapper.`)
    console.log(``);
    console.log(`Arguments:`);
    console.log(`* --help, -h\t Show this message and exit.`);
    console.log(`* --version, -v\t Show version info and exit.`);
    console.log(`* --interactive, -i\t Watch for file changes, build, and serve at :8080.`);
    console.log(`* --type, -t\t Specify output type (html/revealjs/pdf).`);
    console.log(`* --config\t Specify path to config.`);
    console.log(`\t\t Default configs: ./.patchouli.js, ~/.patchouli/.patchouli.js`);
    return;
}

if(args.v || args.version) {
    console.log(`${package_info.name} \t v.${package_info.version}`);
    console.log(``);
    console.log(`\t* npm: \t\t https://npmjs.org/package/${package_info.name}`);
    console.log(`\t* github: \t ${package_info.repository.url}`);
    console.log(`\t* readme: \t ${package_info.repository.url.split('.git')[0]}/blob/master/readme.md`);
    console.log(`\t* author: \t ${package_info.author}`);
    return;
}

const errorHandler = r => {
    if(r.stderr)
        console.error(r.stderr);
    if(r.stdout)
        console.log(r.stdout);
    else
        console.error(r);

    process.exit(1);
};

process.on('unhandledRejection', errorHandler);

const markdown_files = args._
        .map(pattern => glob.sync(pattern))
        .reduce((a, b) => a.concat(b), [])
        .filter(md_only);

    debug("Searching for md files", markdown_files);

const build = () => {
    delete require.cache['./lib/config'];
    const config = require('./lib/config');

    const targets = markdown_files.length ? markdown_files : glob.sync('*.md');

    debug("Found target files", targets);

    const types = [args.type || args.t || config.type || 'pdf'].reduce((a, b) => a.concat(b), []);

    debug("Build types", types);

    return Promise.all(types.map(type => {
        debug("Building type", type, targets);
        return build_document(type, targets).catch(errorHandler);
    }));
};

const serve = () =>
    exec(`${__dirname}/node_modules/http-server/bin/http-server -c-1`)
    .stdout.on('data', console.log.bind(console));

if(args.interactive || args.i) {
    serve();
    (async () => {
        while(true) {
            await build()
            await new Promise(resolve => {
                const watcher = chokidar.watch('.', {ignored: /^\.out/, ignoreInitial: true});
                watcher.on('all', async () => {
                    await watcher.close();
                    resolve();
                });
            });
        }
    })();
}
else {
    build();
}