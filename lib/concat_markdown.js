const {
    existsSync,
    readFileSync,
    unlink,
    writeFileSync
} = require('fs');

module.exports = (files, dest) =>
    unlink(dest, () =>
        writeFileSync(dest, files
            .filter(_ => existsSync(_))
            .map(_ => readFileSync(_))
            .map(_ => _.toString())
            .join('\n\n'))
    );