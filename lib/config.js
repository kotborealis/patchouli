const {dirname, resolve} = require('path');
const {existsSync} = require('fs');

const config_stack = [
    resolve(dirname(require.resolve('../')), '.patchouli.js'),
    resolve(process.env.HOME, './.patchouli/.patchouli.js'),
    resolve(process.cwd(), '.patchouli.js')
].filter(existsSync);

const config = require('chen.js').config(config_stack);

module.exports = config;