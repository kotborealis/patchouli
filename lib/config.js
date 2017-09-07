const path = require('path');
const default_config = path.join(path.dirname(require.resolve('../')), '.patchouli.js');
const config = require('chen.js').config('.patchouli.js', [
    default_config,
    '~/.patchouli/.patchouli.js'
]).resolve();

module.exports = config;