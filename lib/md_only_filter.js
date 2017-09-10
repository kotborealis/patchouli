const {extname} = require('path');

module.exports = (file) => extname(file) === '.md';