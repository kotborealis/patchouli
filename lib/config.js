const path = require('path');

const default_config = path.join(path.dirname(require.resolve('../')), '.patchouli.js');
const user_config = path.join(process.env.HOME, '/.patchouli/.patchouli.js');

const config = require('chen.js').config('.patchouli.js', [
    default_config,
    user_config
]);

module.exports = config;