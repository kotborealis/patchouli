const args = require('chen.js').args;
process.on('unhandledRejection', r => console.error(r));
const build = require('./lib/build');

build('./test.md', null, 'html').then(console.log.bind(console));

//if(args._.indexOf('watch') >= 0 || args.watch){
//
//}