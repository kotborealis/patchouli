const path = require('path');
const default_config = path.join(require.resolve('../'), '.patchouli.js');
const config = require('chen.js').config('.patchouli.js', default_config).resolve();

module.exports = config;