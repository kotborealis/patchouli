
const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const path = require('path');

const pandoc = path.join(process.env.HOME, '.cabal/bin/pandoc');

module.exports = (input, args) => {
	return exec('pandoc ' + [input, ...args].join(' '), {env: process.env})
}