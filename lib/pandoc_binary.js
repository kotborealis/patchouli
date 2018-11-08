const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const debug = require('./debug');

module.exports = (input, args, bin) => {
	const cmd = bin + ' ' + [input, ...args].join(' ');
	debug("Executing command:", cmd);
	return exec(cmd, {env: process.env})
};