const fs = require('fs');
module.exports = (files, dest) =>
    fs.unlink(dest, () =>
        fs.writeFileSync(dest, files
            .map(_ => fs.existsSync(_))
            .map(_ => fs.readFileSync(_))
            .map(_ => _.toString())
            .join('\n\n'))
    );