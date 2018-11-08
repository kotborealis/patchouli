const fs = require('fs');

module.exports = targets =>
    Promise.all(targets.map(_ =>
        new Promise(resolve => fs.unlink(_, resolve))
    ));