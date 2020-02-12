const path = require('path');
const fs = require('fs');

const config_stack = [
    path.resolve(path.dirname(require.resolve('../')), '.patchouli.js'),
    path.resolve(process.env.HOME, './.patchouli/.patchouli.js'),
    path.resolve(process.cwd(), '.patchouli.js')
].filter(fs.existsSync);

const config = require('chen.js').config(config_stack);

module.exports = config;