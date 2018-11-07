const {promisify} = require('util');
const exec = promisify(require('child_process').exec);

module.exports = (input, args, bin) => {
	const cmd = bin + ' ' + [input, ...args].join(' ');
	console.info("Executing command:", cmd);
	return exec(cmd, {env: process.env})
};