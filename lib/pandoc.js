const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const path = require('path');

module.exports = (input, args, bin='pandoc') => {
	return exec(bin + ' ' + [input, ...args].join(' '), {env: process.env})
}