const path = require('path');

module.exports = (filename, type) => `${path.parse(filename).name}.${type}`;