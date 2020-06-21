const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const debug = require('./debug');

module.exports = (cmd, env = process.env) => {
	debug("Executing command: ", cmd);
	return exec(cmd, {env});
};