const fs = require('fs');

module.exports = targets => targets.forEach(_ => fs.unlinkSync(_));