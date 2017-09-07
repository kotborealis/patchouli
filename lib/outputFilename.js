const path = require('path');

module.exports = (filename, type) => [...filename.split('.').slice(0, -1), type].join('.');