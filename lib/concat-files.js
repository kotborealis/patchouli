const fs = require('fs');
module.exports = (files, dest) =>
    fs.writeFileSync(dest, files
        .map(_ => fs.readFileSync(_))
        .map(_ => _.toString())
        .join('\n\n'));